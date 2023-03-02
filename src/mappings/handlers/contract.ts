// src/contract.ts
import { BlockHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { Func } from "../../abi/abi.support";
import * as erc721 from '../../abi/ERC721';
import { Multicall } from "../../abi/multicall";
import { Contract } from "../../model/generated/contract.model";
import { TransferData } from "../../types";
import { MULTICALL_ADDRESS } from "./saveTransfers";
let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(ctx:BlockHandlerContext<Store>,transferData:TransferData): Promise<Contract> {

  if (contractEntity == null) {
    contractEntity = await ctx.store.get(Contract, transferData.contract);
    if (contractEntity == null) {
    const functions = [erc721.functions.name,erc721.functions.symbol,erc721.functions.totalSupply]
    //mulicall for fetching collection name symbol and total supply
    const multicall = new Multicall(ctx, MULTICALL_ADDRESS)
    const res = await multicall.tryAggregate(functions.map((func)=>[func,transferData.contract,[]] as [func: Func<any, {}, any>,
      address: string,
      calls: any[],]),100)
    
      contractEntity = new Contract({
        id: transferData.contract,
        name: res[0].success ?  res[0].value : '',
        symbol: res[1].success ?  res[1].value :  '',
        totalSupply: res[2].success ?  res[2].value :  10000n,
        collectionType:transferData.collectionType
      });
      await ctx.store.save(contractEntity);
    }
  }
  return contractEntity;
}