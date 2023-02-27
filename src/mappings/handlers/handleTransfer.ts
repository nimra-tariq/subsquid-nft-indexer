import { BlockHandlerContext, LogHandlerContext } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { In } from "typeorm"
import * as erc721 from "../../abi/ERC721"
import { Owner, Token, Transfer } from "../../model"
import { Ctx, TransferData } from '../../types/index'
import { getOrCreateContractEntity } from "./contract"

export const handle = async (ctx:Ctx) => {
    let transfersData: TransferData[] = []

    for (let block of ctx.blocks) {
        for (let item of block.items) {
            if (item.kind !== 'evmLog') continue
            // if (item.evmLog.topics[0] === ens.events.Transfer.topic && item.address === contractAddress) {
              if (item.evmLog.topics[0] === erc721.events.Transfer.topic && item.evmLog.topics.length === 4 ) {
              //  console.log(item,'item logged')
                transfersData.push(handleTransfer({
                    ...ctx,
                    block:block.header,
                    ...item
                }))
            }
        }
    }

    ctx.log.info(`Saving ${transfersData.length} transfers`)
  await saveTransfers({
    ...ctx,
    block: ctx.blocks[ctx.blocks.length - 1].header,
  }, transfersData);
}

  
  function handleTransfer(
    ctx: LogHandlerContext<
      Store,
      { evmLog: { topics: true; data: true }; transaction: { hash: true } }
    >
  ): TransferData {
    const { evmLog, transaction, block } = ctx;
    const addr = evmLog.address.toLowerCase()
      // const abi = new Interface([
    //   `event Transfer(
    //     address indexed from,
    //     address indexed to,
    //     uint256 indexed tokenId
    //   )`,
    // ])
    // const { from, to, tokenId } = abi.decodeEventLog('Transfer',evmLog.data,evmLog.topics);
    const { from, to, tokenId } = erc721.events.Transfer.decode(evmLog);
    // console.log(from,to,'hello i am logged');
  
    const transfer: TransferData = {
      id: `${transaction.hash}-${addr}-${tokenId.toBigInt()}-${evmLog.index}`,
      tokenId: tokenId.toBigInt(),
      from,
      to,
      timestamp: new Date(block.timestamp),
      block: block.height,
      transactionHash: transaction.hash,
      contract:addr
    };
  
    return transfer;
  }

  async function saveTransfers(
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
          contract: await getOrCreateContractEntity(ctx.store,transferData.contract),
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