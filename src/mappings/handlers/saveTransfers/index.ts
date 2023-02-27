import { BlockHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { In } from "typeorm";
import { Owner, Token, Transfer } from "../../../model";
import { TransferData } from "../../../types";
import { getOrCreateContractEntity } from "../contract";

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
  
      //get owners from the db and stor in map and get them 
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
          contract: await getOrCreateContractEntity(ctx.store,transferData),
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
  
    //TODO : need to handle multicall 
    // const maxHeight = maxBy(transfersData, t => t.block)!.block; 
    // // query the multicall contract at the max height of the chunk
    // const multicall = new Multicall(ctx, {height: maxHeight}, MULTICALL_ADDRESS)
  
    // ctx.log.info(`Calling mutlicall for ${transfersData.length} tokens...`)
    // call in pages of size 100
    // const results = await multicall.tryAggregate(
    //   functions.tokenURI,
    //   transfersData.map(t => [
    //     EXOSAMA_NFT_CONTRACT,
    //     [BigNumber.from(t.tokenId)]
    //   ] as [string, any[]]),
    //   100
    // );
  
    // results.forEach((res, i) => {
    //   let t = tokens.get(transfersData[i].tokenId.toString());
    //   if (t) {
    //     let uri = '';
    //     if (res.success) {
    //       uri = <string>res.value;
    //     } else if (res.returnData) {
    //       uri = <string>functions.tokenURI.tryDecodeResult(res.returnData) || '';
    //     }
    //   }
    // });
    ctx.log.info(`Done`);
    
    
    await ctx.store.save([...owners.values()]);
    await ctx.store.save([...tokens.values()]);
    await ctx.store.save([...transfers.values()]);
  
  }