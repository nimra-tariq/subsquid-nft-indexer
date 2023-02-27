import { EvmBatchProcessor } from "@subsquid/evm-processor"
import { AddLogItem, LogItem, TransactionItem } from "@subsquid/evm-processor/lib/interfaces/dataSelection"
import { BatchHandlerContext, BatchProcessorItem, BlockHandlerContext, LogHandlerContext } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store";

type Processor = EvmBatchProcessor<AddLogItem<LogItem<false> | TransactionItem<false>, LogItem<{
    evmLog: {
        topics: true;
        data: true;
    };
    transaction: {
        hash: true;
    };
}>>>


export type Item = BatchProcessorItem<Processor>
export type Ctx = BatchHandlerContext<Store, Item>

export enum ContractStandard {
    ERC721='ERC721',
    ERC1155='ERC1155'
} 

export type TransferData = {
    id: string;
    from: string;
    to: string;
    tokenId: bigint;
    timestamp: Date;
    block: number;
    transactionHash: string;
    contract:string;
    collectionType:ContractStandard
  };