import { lookupArchive } from '@subsquid/archive-registry'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as erc1155 from './abi/ERC1155'
import * as erc721 from './abi/ERC721'
import * as exo from './abi/ens'
import * as bayc from './abi/BAYC'
import { handleBatch } from './mappings/handlers/handleTransfer'
import * as ens from './abi/ens'

export const EXOSAMA_NFT_CONTRACT = '0xac5c7493036de60e63eb81c5e9a440b42f47ebf5';
export const ENS_NFT_CONTRACT = '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72';
export const BAYC = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
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
            // [erc721.events.Transfer.topic],
            // []
            // [bayc.events.Transfer.topic,ens.events.Transfer.topic],
            // [erc721.events.Transfer.topic],
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




  