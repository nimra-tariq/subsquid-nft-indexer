import { LogHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as erc1155 from "../../../abi/ERC1155";
import { ContractStandard, TransferData } from "../../../types";

export function handleErc1155TransferSingle(
    ctx: LogHandlerContext<
      Store,
      { evmLog: { topics: true; data: true }; transaction: { hash: true } }
    >
  ): TransferData {
    const { evmLog, transaction, block } = ctx;
    const addr = evmLog.address.toLowerCase()
    const { from, to, id,value } = erc1155.events.TransferSingle.decode(evmLog);
      
    const transfer: TransferData = {
      id: `${transaction.hash}-${addr}-${id.toBigInt()}-${evmLog.index}`,
      tokenId: id.toBigInt(),
      from,
      to,
      timestamp: new Date(block.timestamp),
      block: block.height,
      transactionHash: transaction.hash,
      contract:addr,
      collectionType:ContractStandard.ERC1155
    };
  
    return transfer;
  }

  
export function handleErc1155TransferBatch(
    ctx: LogHandlerContext<
      Store,
      { evmLog: { topics: true; data: true }; transaction: { hash: true } }
    >
  ): TransferData {
    const { evmLog, transaction, block } = ctx;
    const addr = evmLog.address.toLowerCase();

    const { from, to, ids } = erc1155.events.TransferBatch.decode(evmLog);

    //TODO need to handle transfer batch ids here
    // let transfers: TransferData[] = []
    // for (let i = 0; i < ids.length; i++) {
    // const transfer: TransferData = {
    //   id: `${transaction.hash}-${addr}-${ids[i].toBigInt()}-${evmLog.index}`,
    //   tokenId: ids[i].toBigInt(),
    //   from,
    //   to,
    //   timestamp: new Date(block.timestamp),
    //   block: block.height,
    //   transactionHash: transaction.hash,
    //   contract:addr,
    //   collectionType:ContractStandard.ERC1155
    // };
  
    // transfers.push(transfer)

    const transfer: TransferData = {
      id: `${transaction.hash}-${addr}-${ids[0].toBigInt()}-${evmLog.index}`,
      tokenId: ids[0].toBigInt(),
      from,
      to,
      timestamp: new Date(block.timestamp),
      block: block.height,
      transactionHash: transaction.hash,
      contract:addr,
      collectionType:ContractStandard.ERC1155
    };
    return transfer;
  }