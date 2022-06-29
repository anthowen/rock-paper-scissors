import { parseEther } from "@ethersproject/units";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { solidityKeccak256 } from "ethers/lib/utils";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { RockPaperScissors } from "../../src/types/RockPaperScissors";
import { Signers } from "../types";

async function generateSignature(signer: SignerWithAddress, gameNumber: number, move: number) {
  const signature = await signer.signMessage(
    Buffer.from(solidityKeccak256(["uint256", "uint256"], [gameNumber, move]).slice(2), "hex"),
  );

  return signature;
}

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.bob = signers[1];
  });

  describe("RockPaperScissors", function () {
    beforeEach(async function () {
      const artifact: Artifact = await artifacts.readArtifact("RockPaperScissors");
      this.game = <RockPaperScissors>await waffle.deployContract(this.signers.admin, artifact, []);
    });

    it("should let us create a game", async function () {
      const bet = parseEther("0.1");

      await expect(this.game.createGame(this.signers.bob.address, { value: bet }))
        .to.emit(this.game, "GameCreated")
        .withArgs(this.signers.admin.address, 1, bet);
    });

    it("should let us join a game for a valid participant", async function () {
      const bet = parseEther("0.1");
      await this.game.createGame(this.signers.bob.address, { value: bet });

      await expect(this.game.connect(this.signers.bob).joinGame(1, { value: bet }))
        .to.emit(this.game, "GameStarted")
        .withArgs([this.signers.admin.address, this.signers.bob.address], 1);
    });

    it("should detect a winner", async function () {
      const bet = parseEther("0.1");
      await this.game.createGame(this.signers.bob.address, { value: bet });

      await this.game.connect(this.signers.bob).joinGame(1, { value: bet });

      const creatorSignature = await generateSignature(this.signers.admin, 1, 1);
      const participantSignature = await generateSignature(this.signers.bob, 1, 2);

      await this.game.connect(this.signers.admin).makeMove(1, creatorSignature); // rock
      await expect(this.game.connect(this.signers.bob).makeMove(1, participantSignature)) // paper
        .to.emit(this.game, "GameComplete")
        .withArgs(this.signers.bob.address, 1);
    });
  });
});
