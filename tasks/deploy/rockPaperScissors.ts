import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { RockPaperScissors } from "../../src/types/RockPaperScissors";
import type { RockPaperScissors__factory } from "../../src/types/factories/RockPaperScissors__factory";

task("deploy:RockPaperScissors").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const factory: RockPaperScissors__factory = <RockPaperScissors__factory>(
    await ethers.getContractFactory("RockPaperScissors")
  );
  const contract: RockPaperScissors = <RockPaperScissors>(
    await factory.connect(signers[0]).deploy(taskArguments.greeting)
  );
  await contract.deployed();
  console.log("RockPaperScissors deployed to: ", contract.address);
});
