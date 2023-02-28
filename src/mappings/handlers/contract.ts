// src/contract.ts
import { Store } from "@subsquid/typeorm-store";
import { ContractStandard } from "../../model";
import { Contract } from "../../model/generated/contract.model"
import { TransferData } from "../../types";

let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(store: Store,transferData:TransferData): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await store.get(Contract, transferData.contract);
    if (contractEntity == null) {
      contractEntity = new Contract({
        id: transferData.contract,
        name: "Exosama",
        symbol: "EXO",
        totalSupply: 10000n,
        collectionType:transferData.collectionType
      });
      await store.save(contractEntity);
    }
  }
  return contractEntity;
}