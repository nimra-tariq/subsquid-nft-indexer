import { BlockHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { maxBy } from "lodash";
import { In } from "typeorm";
import * as erc721 from '../../../abi/ERC721';
import { Multicall } from "../../../abi/multicall";
import { Owner, Token, Transfer } from "../../../model";
import { TransferData } from "../../../types";
import { getOrCreateContractEntity } from "../contract";

export const MULTICALL_ADDRESS ='0x5ba1e12693dc8f9c48aad8770482f4739beed696'

export async function saveTransfers(
    ctx: BlockHandlerContext<Store>,
    transfersData: TransferData[]
  ) {

    // const functions = [erc721.functions.name,erc721.functions.symbol,erc721.functions.totalSupply]
    //mulicall for fetching collection name symbol and total supply
    // const multicall = new Multicall(ctx, MULTICALL_ADDRESS)
    // const results = await multicall.tryAggregate(functions.map((func)=>[func,ENS_NFT_CONTRACT,[]] as [func: Func<any, {}, any>, address: string, args: any[]]))
    // const results = await multicall.tryAggregate(functions.map((func)=>[func,ENS_NFT_CONTRACT,[]] as [func: Func<any, {}, any>,
    //   address: string,
  //   calls: any[],]))

  // const results = await multicall.tryAggregate(functions.map((func)=>[func,ENS_NFT_CONTRACT,[]] as [func: Func<any, {}, any>,
  //   address: string,
  //   calls: any[],]))
  // getOrCreateContractEntity(ctx,transfersData[0])
  // getOrCreateContractEntity(ctx,transfersData)
    // const results = await multicall.tryAggregate(erc721.functions.tokenURI,[{id:4,con:BAYC},{id:5,con:ENS_NFT_CONTRACT},{id:6,con:ENS_NFT_CONTRACT},{id:23,con:ENS_NFT_CONTRACT},{id:23,con:ENS_NFT_CONTRACT}].map(tk => [tk.con, [tk.id]] as [address: string, args: any[]]))

    // const results = await multicall.tryAggregate(
    //   bayc.functions.tokenURI,
    //   transfersData.map(t => [
    //     BAYC,
    //     [BigNumber.from(t.tokenId)]
    //   ] as [string, any[]]),
    //   100
    // );

  //   const results = await multicall.tryAggregate(bayc.functions.tokenURI, transfersData.map(t => [BAYC, [BigNumber.from(t.tokenId)]] as [string, any[]]),100);

  //   const results = await multicall.tryAggregate(ERC20.functions.symbol, tokenAddresses.map(a => [a, []]))
  // const results = await multicall.tryAggregate(ens.functions.name,[ENS_NFT_CONTRACT,[]] as [address: string, args: any[]])


  //   const results = await multicall.tryAggregate(erc721.functions.tokenURI, transfersData.map(t => [t.contract, [BigNumber.from(t.tokenId)]] as [address: string, args: any[]]),100 )
  //   console.log(results,'res')

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
  
    // //TODO : need to handle multicall 
    // const maxHeight = maxBy(transfersData, t => t.block)!.block; 
    // // // query the multicall contract at the max height of the chunk
    // const multicall = new Multicall(ctx, {height: maxHeight}, MULTICALL_ADDRESS)
  
    // ctx.log.info(`Calling mutlicall for ${transfersData.length} tokens...`)
    // // call in pages of size 100
    // const results = await multicall.tryAggregate(
    //   bayc.functions.tokenURI,
    //   transfersData.map(t => [
    //     BAYC,
    //     [BigNumber.from(t.tokenId)]
    //   ] as [string, any[]]),
    //   100
    // );

    // const results = await multicall.tryAggregate(
    //   transfersData.map(t => [
    //     // t.collectionType===ContractStandard.ERC721?erc721.functions.tokenURI:erc1155.functions.uri,
    //     erc721.functions.tokenURI,
    //     t.contract,
    //     [BigNumber.from(t.tokenId)]
    //   ] as [Func<any, {}, any>,string, any[]]),
    //   100
    // );
  
    // console.log(transfersData[0].contract,'contract addrss is here');
    // const results = await multicall.tryAggregate(erc721.functions.tokenURI, transfersData.map(t => [t.contract, [BigNumber.from(t.tokenId)]] as [address: string, args: any[]]) )

      // console.log(results,'results mapped')

    // results.forEach((res, i) => {
    //   let t = tokens.get(transfersData[i].tokenId.toString());
    //   if (t) {
    //     // let uri = '';
    //     if (res.success) {
    //       t.uri = <string>res.value;
    //     } else if (res.returnData) {
    //       // t.uri = <string>erc721.functions.tokenURI.tryDecodeResult(res.returnData) || <string>erc1155.functions.uri.tryDecodeResult(res.returnData)||'null i am saved';
    //       // t.uri = <string>bayc.functions.tokenURI.tryDecodeResult(res.returnData) || 'store null if failed'
    //       t.uri = <string>erc721.functions.tokenURI.tryDecodeResult(res.returnData) || 'store null if failed'
    //       // t.uri = 'null i am saved';
    //     }
    //   }
    // });
    // ctx.log.info(`Done`);
    
    await ctx.store.save([...owners.values()]);
    await ctx.store.save([...tokens.values()]);
    await ctx.store.save([...transfers.values()]);
  
  }