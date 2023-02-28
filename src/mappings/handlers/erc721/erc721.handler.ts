import { LogHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as erc721 from "../../../abi/ERC721";
import { ContractStandard, TransferData } from "../../../types";

export function handleErc721Transfer(
    ctx: LogHandlerContext<
      Store,
      { evmLog: { topics: true; data: true }; transaction: { hash: true } }
    >
  ): TransferData {
    const { evmLog, transaction, block } = ctx;
    const addr = evmLog.address.toLowerCase()
 
    const { from, to, tokenId } = erc721.events.Transfer.decode(evmLog);
      
    const transfer: TransferData = {
      id: `${transaction.hash}-${addr}-${tokenId.toBigInt()}-${evmLog.index}`,
      tokenId: tokenId.toBigInt(),
      from,
      to,
      timestamp: new Date(block.timestamp),
      block: block.height,
      transactionHash: transaction.hash,
      contract:addr,
      collectionType:ContractStandard.ERC721
    };
  
    return transfer;
  }