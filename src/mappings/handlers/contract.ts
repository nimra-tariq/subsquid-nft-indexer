// src/contract.ts
import { Store } from "@subsquid/typeorm-store";
import { Contract } from "../../model/generated/contract.model"

let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(store: Store,contractAddress:string): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await store.get(Contract, contractAddress);
    if (contractEntity == null) {
      contractEntity = new Contract({
        id: contractAddress,
        name: "Exosama",
        symbol: "EXO",
        totalSupply: 10000n,
      });
      await store.insert(contractEntity);
    }
  }
  return contractEntity;
}