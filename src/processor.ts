import { lookupArchive } from '@subsquid/archive-registry'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as erc721 from './abi/ERC721'
import { handle } from './mappings/handlers/handleTransfer'

const processor = new EvmBatchProcessor()
    .setDataSource({
        chain: process.env.RPC_ENDPOINT || 'https://rpc.ankr.com/eth',
        archive: lookupArchive('eth-mainnet'),
    })
    .addLog([], {
        range: {from: 9_082_465},
        filter: [
            // topic0: 'Transfer(address,address,uint256)'
            [erc721.events.Transfer.topic],
            // // topic1: anything goes
            // [],
            // // topic2: anything goes
            // [],
            // //tpoic3: anythink goes
            // []
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

processor.run(new TypeormDatabase(),(ctx)=>handle(ctx))




  