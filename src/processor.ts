import { lookupArchive } from '@subsquid/archive-registry'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as erc721 from './abi/ERC721'
import * as ens from './abi/ens'
import { handle } from './mappings/handlers/handleTransfer'

const processor = new EvmBatchProcessor()
    .setDataSource({
        chain: process.env.RPC_ENDPOINT || 'https://rpc.ankr.com/eth',
        archive: lookupArchive('eth-mainnet'),
    })
    .addLog('*', {
        // range: {from: 6_082_465},
        filter: [[erc721.events.Transfer.topic]],
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


processor.run(new TypeormDatabase(),(ctx)=>handle(ctx))




  