// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

error NoEtherSent();
error InvalidGameNumber();
error NotEnoughBet();
error UnmatchingParticipant();
error NotParticipantJoined();
error NotAllowedPlayer();
error NotAllowedZeroAddress();
error IncorrectSignature();
error GameEnded();
error NotAllowed();

contract RockPaperScissors {
    using ECDSA for bytes32;

    struct GameInfo {
        address creator;
        address participant;
        uint256 bet;
        bool hasJoined;
    }

    struct PlayInfo {
        bytes signature;
        address sender;
        bool hasEnded;
    }

    uint256 public gameCount;
    mapping(uint256 => GameInfo) public gameInfos;
    mapping(uint256 => PlayInfo) private playInfos;

    event GameCreated(address creator, uint256 gameNumber, uint256 bet);
    event GameStarted(address[2] players, uint256 gameNumber);
    event GameComplete(address winner, uint256 gameNumber);

    /**
     * @notice Create a game.
     * It is a payable endpoint meaning the creator of the game will send ether directly to it.
     * The ether sent to the contract should be used as the bet for the game.
     * @param _participant The address of the participant allowed to join the game.
     */
    function createGame(address payable _participant) external payable {
        if (msg.value == 0) revert NoEtherSent();
        if (_participant == address(0)) revert NotAllowedZeroAddress();

        uint256 gameNumber = gameCount + 1;

        gameInfos[gameNumber] = GameInfo(msg.sender, _participant, msg.value, false);
        gameCount = gameNumber;

        emit GameCreated(msg.sender, gameNumber, msg.value);
    }

    /**
     * @notice Join a game. It is a payable endpoint meaning the joining participant
     * will send ether directly to it. The ether sent to the contract should be used
     * as the bet for the game. Any additional ether that exceeds the original
     * bet of the creator should be refunded.
     * @param _gameNumber - Corresponds to the gameNumber provided by the GameCreated event
     */
    function joinGame(uint256 _gameNumber) external payable {
        if (_gameNumber <= 0 || _gameNumber > gameCount) revert InvalidGameNumber();

        GameInfo storage _info = gameInfos[_gameNumber];

        if (msg.value < _info.bet) revert NotEnoughBet();
        if (_info.participant != msg.sender) revert UnmatchingParticipant();

        _info.hasJoined = true;
        if (msg.value > _info.bet) {
            payable(msg.sender).transfer(msg.value - _info.bet);
        }

        emit GameStarted([_info.creator, _info.participant], _gameNumber);
    }

    /**
     * @notice make a move during a game
     * @param _gameNumber Corresponds to the gameNumber provided by the GameCreated event
     * @param _signature Signature indicating the move for specific game number
     */
    function makeMove(uint256 _gameNumber, bytes memory _signature) external {
        if (_gameNumber <= 0 || _gameNumber > gameCount) revert InvalidGameNumber();

        GameInfo memory _info = gameInfos[_gameNumber];

        if (_info.hasJoined == false) revert NotParticipantJoined();
        if (_info.creator != msg.sender && _info.participant != msg.sender) revert NotAllowedPlayer();

        PlayInfo memory _plInfo = playInfos[_gameNumber];

        if (_plInfo.signature.length == 0) {
            // Verify signature. If invalid, throws an exception
            extractMoveNumber(msg.sender, _gameNumber, _signature);

            playInfos[_gameNumber] = PlayInfo(_signature, msg.sender, false);
        } else {
            if (_plInfo.sender == msg.sender) revert NotAllowed();
            if (_plInfo.hasEnded == true) revert GameEnded();

            uint256 creatorMove = 0;
            uint256 participantMove = 0;
            if (_info.creator == msg.sender) {
                creatorMove = extractMoveNumber(_info.creator, _gameNumber, _signature);
                participantMove = extractMoveNumber(_info.participant, _gameNumber, _plInfo.signature);
            } else {
                creatorMove = extractMoveNumber(_info.creator, _gameNumber, _plInfo.signature);
                participantMove = extractMoveNumber(_info.participant, _gameNumber, _signature);
            }

            uint256 result = judgeMove(creatorMove, participantMove);

            playInfos[_gameNumber].hasEnded = true;

            if (result == 3) {
                payable(_info.creator).transfer(_info.bet);
                payable(_info.participant).transfer(_info.bet);
                emit GameComplete(address(0), _gameNumber);
            } else if (result == 1) {
                payable(_info.creator).transfer(_info.bet * 2);
                emit GameComplete(_info.creator, _gameNumber);
            } else {
                payable(_info.participant).transfer(_info.bet * 2);
                emit GameComplete(_info.participant, _gameNumber);
            }
        }
    }

    /**
     * @notice Judge result between 2 moves
     * @param _move1 1, 2 or 3 corresponding to 'rock', 'paper', 'scissors' respectively
     * @param _move2 1, 2 or 3 corresponding to 'rock', 'paper', 'scissors' respectively
     * @return result 1 if 1st move wins, 2 if 2nd move wins, 3 if tied
     */
    function judgeMove(uint256 _move1, uint256 _move2) internal pure returns (uint256 result) {
        if (_move1 == _move2) return 3;

        if (_move1 == 1) {
            if (_move2 == 2) {
                return 2;
            }
            return 1;
        }

        if (_move1 == 2) {
            if (_move2 == 1) {
                return 1;
            }
            return 2;
        }

        if (_move1 == 3) {
            if (_move2 == 1) {
                return 2;
            }
            return 1;
        }
    }

    /**
     * @notice Extract the move from the signature, signed by the player
     * @param _player creator or participant address
     * @param _gameNumber game number
     * @param _signature signature
     * @return move 1, 2 or 3 corresponding to 'rock', 'paper', 'scissors' respectively
     */
    function extractMoveNumber(
        address _player,
        uint256 _gameNumber,
        bytes memory _signature
    ) internal pure returns (uint256 move) {
        for (uint256 i = 0; i < 3; i++) {
            bytes32 signedHash = keccak256(abi.encodePacked(_gameNumber, i + 1));
            bytes32 messageHash = signedHash.toEthSignedMessageHash();
            address signer = messageHash.recover(_signature);

            if (signer == _player) {
                return i + 1;
            }
        }

        revert IncorrectSignature();
    }
}
