/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RockPaperScissors,
  RockPaperScissorsInterface,
} from "../RockPaperScissors";

const _abi = [
  {
    inputs: [],
    name: "GameEnded",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidGameNumber",
    type: "error",
  },
  {
    inputs: [],
    name: "NoEtherSent",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedPlayer",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughBet",
    type: "error",
  },
  {
    inputs: [],
    name: "NotParticipantJoined",
    type: "error",
  },
  {
    inputs: [],
    name: "UnmatchingParticipant",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameNumber",
        type: "uint256",
      },
    ],
    name: "GameComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[2]",
        name: "players",
        type: "address[2]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameNumber",
        type: "uint256",
      },
    ],
    name: "GameStarted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_participant",
        type: "address",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameInfos",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasJoined",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameNumber",
        type: "uint256",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameNumber",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "makeMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061110e806100206000396000f3fe60806040526004361061005a5760003560e01c80637d1b4687116100435780637d1b46871461009d578063ea2b33771461011e578063efaa55a01461013e57600080fd5b8063474d0b5a1461005f5780634d1975b414610074575b600080fd5b61007261006d366004610ee0565b610151565b005b34801561008057600080fd5b5061008a60005481565b6040519081526020015b60405180910390f35b3480156100a957600080fd5b506100f16100b8366004610f09565b600160208190526000918252604090912080549181015460028201546003909201546001600160a01b0393841693909116919060ff1684565b604080516001600160a01b0395861681529490931660208501529183015215156060820152608001610094565b34801561012a57600080fd5b50610072610139366004610f38565b61028f565b61007261014c366004610f09565b610801565b34600003610172576040516341eceffb60e11b815260040160405180910390fd5b6001600160a01b03811661019957604051630178409b60e41b815260040160405180910390fd5b600080546101a8906001611009565b60408051608081018252338082526001600160a01b03868116602080850191825234858701818152600060608089018281528b835260018087528b84209a518b54908a167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178c559751908b018054919099169716969096179096559051600288015592516003909601805496151560ff19909716969096179095559086905584519283528201859052928101919091529192507f27bd49aa3baf4aa9d565998bd41f40d6ff8cb737a8b4935d9ead830220fb73bc91015b60405180910390a15050565b81158061029d575060005482115b156102bb5760405163d548863760e01b815260040160405180910390fd5b6000828152600160208181526040808420815160808101835281546001600160a01b03908116825294820154909416928401929092526002820154908301526003015460ff1615156060820181905290910361032a5760405163c944b83d60e01b815260040160405180910390fd5b80516001600160a01b03163314801590610351575060208101516001600160a01b03163314155b1561036f576040516328bcbe1960e01b815260040160405180910390fd5b60008381526002602052604080822081516060810190925280548290829061039690611021565b80601f01602080910402602001604051908101604052809291908181526020018280546103c290611021565b801561040f5780601f106103e45761010080835404028352916020019161040f565b820191906000526020600020905b8154815290600101906020018083116103f257829003601f168201915b5050509183525050600191909101546001600160a01b0381166020830152600160a01b900460ff1615156040909101528051519091506000036104f057610457338585610939565b5060408051606081018252848152336020808301919091526000828401819052878152600282529290922081518051929391926104979284920190610e47565b506020820151600190910180546040909301511515600160a01b027fffffffffffffffffffffff0000000000000000000000000000000000000000009093166001600160a01b03909216919091179190911790556107fb565b336001600160a01b031681602001516001600160a01b03160361052657604051631eb49d6d60e11b815260040160405180910390fd5b6040810151151560010361054d576040516308426a3f60e11b815260040160405180910390fd5b600080336001600160a01b031684600001516001600160a01b03160361059657835161057a908787610939565b915061058f8460200151878560000151610939565b90506105ba565b835183516105a691908890610939565b91506105b784602001518787610939565b90505b60006105c68383610a4d565b600088815260026020526040902060010180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b179055905060038190036106ce57845160408087015190516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801561064b573d6000803e3d6000fd5b5084602001516001600160a01b03166108fc86604001519081150290604051600060405180830381858888f1935050505015801561068d573d6000803e3d6000fd5b506040805160008152602081018990527f91dee0f580099c7b511f44b6135eaa79542c1aa31a7fd840209c419dcc9cda0991015b60405180910390a16107f7565b806001036107635784600001516001600160a01b03166108fc866040015160026106f8919061105b565b6040518115909202916000818181858888f19350505050158015610720573d6000803e3d6000fd5b508451604080516001600160a01b039092168252602082018990527f91dee0f580099c7b511f44b6135eaa79542c1aa31a7fd840209c419dcc9cda0991016106c1565b84602001516001600160a01b03166108fc86604001516002610785919061105b565b6040518115909202916000818181858888f193505050501580156107ad573d6000803e3d6000fd5b50602080860151604080516001600160a01b0390921682529181018990527f91dee0f580099c7b511f44b6135eaa79542c1aa31a7fd840209c419dcc9cda09910160405180910390a15b5050505b50505050565b80158061080f575060005481115b1561082d5760405163d548863760e01b815260040160405180910390fd5b600081815260016020526040902060028101543410156108605760405163eba3b2c560e01b815260040160405180910390fd5b60018101546001600160a01b0316331461088d57604051630c8a250d60e41b815260040160405180910390fd5b60038101805460ff1916600117905560028101543411156108e757600281015433906108fc906108bd903461107a565b6040518115909202916000818181858888f193505050501580156108e5573d6000803e3d6000fd5b505b60408051808201825282546001600160a01b039081168252600184015416602082015290517f89fe59dabc7753e2f45187224490dd580f8b6b1dfef7bb1894b17a352d95fd7491610283918590611091565b6000805b6003811015610a2c57600084610954836001611009565b60408051602081019390935282015260600160405160208183030381529060405280519060200120905060006109d7826040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b905060006109e58287610ab8565b9050876001600160a01b0316816001600160a01b031603610a1657610a0b846001611009565b945050505050610a46565b5050508080610a24906110d2565b91505061093d565b5060405163c1606c2f60e01b815260040160405180910390fd5b9392505050565b6000818303610a5e57506003610ab2565b82600103610a7e5781600203610a7657506002610ab2565b506001610ab2565b82600203610a9e5781600103610a9657506001610ab2565b506002610ab2565b82600303610ab25781600103610a76575060025b92915050565b6000806000610ac78585610adc565b91509150610ad481610b4a565b509392505050565b6000808251604103610b125760208301516040840151606085015160001a610b0687828585610d08565b94509450505050610b43565b8251604003610b3b5760208301516040840151610b30868383610df5565b935093505050610b43565b506000905060025b9250929050565b6000816004811115610b5e57610b5e6110eb565b03610b665750565b6001816004811115610b7a57610b7a6110eb565b03610bcc5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064015b60405180910390fd5b6002816004811115610be057610be06110eb565b03610c2d5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610bc3565b6003816004811115610c4157610c416110eb565b03610c995760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610bc3565b6004816004811115610cad57610cad6110eb565b03610d055760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610bc3565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610d3f5750600090506003610dec565b8460ff16601b14158015610d5757508460ff16601c14155b15610d685750600090506004610dec565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610dbc573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610de557600060019250925050610dec565b9150600090505b94509492505050565b6000807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831681610e2b60ff86901c601b611009565b9050610e3987828885610d08565b935093505050935093915050565b828054610e5390611021565b90600052602060002090601f016020900481019282610e755760008555610ebb565b82601f10610e8e57805160ff1916838001178555610ebb565b82800160010185558215610ebb579182015b82811115610ebb578251825591602001919060010190610ea0565b50610ec7929150610ecb565b5090565b5b80821115610ec75760008155600101610ecc565b600060208284031215610ef257600080fd5b81356001600160a01b0381168114610a4657600080fd5b600060208284031215610f1b57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215610f4b57600080fd5b82359150602083013567ffffffffffffffff80821115610f6a57600080fd5b818501915085601f830112610f7e57600080fd5b813581811115610f9057610f90610f22565b604051601f8201601f19908116603f01168101908382118183101715610fb857610fb8610f22565b81604052828152886020848701011115610fd157600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561101c5761101c610ff3565b500190565b600181811c9082168061103557607f821691505b60208210810361105557634e487b7160e01b600052602260045260246000fd5b50919050565b600081600019048311821515161561107557611075610ff3565b500290565b60008282101561108c5761108c610ff3565b500390565b60608101818460005b60028110156110c25781516001600160a01b031683526020928301929091019060010161109a565b5050508260408301529392505050565b6000600182016110e4576110e4610ff3565b5060010190565b634e487b7160e01b600052602160045260246000fdfea164736f6c634300080d000a";

type RockPaperScissorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RockPaperScissorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RockPaperScissors__factory extends ContractFactory {
  constructor(...args: RockPaperScissorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RockPaperScissors> {
    return super.deploy(overrides || {}) as Promise<RockPaperScissors>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RockPaperScissors {
    return super.attach(address) as RockPaperScissors;
  }
  override connect(signer: Signer): RockPaperScissors__factory {
    return super.connect(signer) as RockPaperScissors__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RockPaperScissorsInterface {
    return new utils.Interface(_abi) as RockPaperScissorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RockPaperScissors {
    return new Contract(address, _abi, signerOrProvider) as RockPaperScissors;
  }
}
