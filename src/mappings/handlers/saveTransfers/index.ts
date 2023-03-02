import { BlockHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { In } from "typeorm";
import { Owner, Token, Transfer } from "../../../model";
import { TransferData } from "../../../types";
import { getOrCreateContractEntity } from "../contract";

export const MULTICALL_ADDRESS ='0x5ba1e12693dc8f9c48aad8770482f4739beed696'

export async function saveTransfers(
    ctx: BlockHandlerContext<Store>,
    transfersData: TransferData[]
  ) {

    const tokensIds: Set<string> = new Set();
    const ownersIds: Set<string> = new Set();
  
    for (const transferData of transfersData) {
      tokensIds.add(transferData.tokenId.toString());
      ownersIds.add(transferData.from);
      ownersIds.add(transferData.to);
    }
  
    const transfers: Set<Transfer> = new Set();
  
    //find tokens by ids in db that are already present
    const tokens: Map<string, Token> = new Map(
      (await ctx.store.findBy(Token, { id: In([...tokensIds]) })).map((token) => [
        token.id,
        token,
      ])
    );
  
    //find owners by ids in db that are already present
    const owners: Map<string, Owner> = new Map(
      (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
        owner.id,
        owner,
      ])
    );
    
    for (const transferData of transfersData) {
  
      //get owners from the db and store in map and get them 
      let from = owners.get(transferData.from);
      if (from == null) {
        from = new Owner({ id: transferData.from, balance: 0n });
        owners.set(from.id, from);
      }
  
      let to = owners.get(transferData.to);
      if (to == null) {
        to = new Owner({ id: transferData.to, balance: 0n });
        owners.set(to.id, to);
      }
  
      const tokenIdString = transferData.tokenId.toString();
  
      let token = tokens.get(tokenIdString);
  
      if (token == null) {
        token = new Token({
          id: tokenIdString,
          //uri: to be set later 
          contract: await getOrCreateContractEntity(ctx,transferData),
        });
        tokens.set(token.id, token);
      }
      token.owner = to;
  
      const { id, block, transactionHash, timestamp } = transferData;
  
      //storing token transfer info
      const transfer = new Transfer({
        id,
        block,
        timestamp,
        transactionHash,
        from,
        to,
        token,
      });
  
      transfers.add(transfer);
    }
  
    
    await ctx.store.save([...owners.values()]);
    await ctx.store.save([...tokens.values()]);
    await ctx.store.save([...transfers.values()]);
  
  }