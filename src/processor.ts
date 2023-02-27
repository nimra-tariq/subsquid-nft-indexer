import { lookupArchive } from '@subsquid/archive-registry'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as erc1155 from './abi/ERC1155'
import * as erc721 from './abi/ERC721'
import { handleBatch } from './mappings/handlers/handleTransfer'

const processor = new EvmBatchProcessor()
    .setDataSource({
        chain: process.env.RPC_ENDPOINT || 'https://rpc.ankr.com/eth',
        archive: lookupArchive('eth-mainnet'),
    })
    .addLog([], {
        range: {from: 9_082_465},
        filter: [
            //handle erc721 transfer
            [erc721.events.Transfer.topic,erc1155.events.TransferSingle.topic,erc1155.events.TransferBatch.topic],
            //handle erc1155 transferSingle
            // [erc1155.events.TransferSingle.topic],
            // //handle erc1155 transferBatch
            // [erc1155.events.TransferBatch.topic],
          ],
        data: {
            evmLog: {
                topics: true,
                data: true,
            },
            transaction: {
                hash: true,
            },
        } as const,
    })
    // .addTransaction([], {sighash: erc721.functions['safeTransferFrom(address,address,uint256)'].sighash})

processor.run(new TypeormDatabase(),(ctx)=>handleBatch(ctx))




  