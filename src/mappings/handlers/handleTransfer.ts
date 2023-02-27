import * as erc1155 from "../../abi/ERC1155"
import * as erc721 from "../../abi/ERC721"
import { Ctx, TransferData } from '../../types/index'
import { handleErc1155TransferBatch, handleErc1155TransferSingle } from "./erc1155/erc1155.handler"
import { handleErc721Transfer } from "./erc721/erc721.handler"
import { saveTransfers } from "./saveTransfers"

export const handleBatch = async (ctx:Ctx) => {
    let transfersData: TransferData[] = []

    for (let block of ctx.blocks) {
        for (let item of block.items) {

            if (item.kind !== 'evmLog') continue
              if ( item.evmLog.topics.length === 4 ) {
                // console.log(item)
                const ctxLog = {
                  ...ctx,
                  block:block.header,
                  ...item
              }
              let transferData : TransferData = {} as TransferData
              switch (item.evmLog.topics[0]) {

                case erc721.events.Transfer.topic:
                    transferData = handleErc721Transfer(ctxLog);
                  break;
                case erc1155.events.TransferSingle.topic:
                  transferData = handleErc1155TransferSingle(ctxLog)
                break;
                case erc1155.events.TransferBatch.topic:
                  transferData = handleErc1155TransferBatch(ctxLog)
                  break;
                case erc1155.events.URI.topic:
                  // await modules.handleErc1155UriChanged();
                  break;
                default:
              }
                transfersData.push(transferData)
            }
        }
    }

    ctx.log.info(`Saving ${transfersData.length} transfers`)
  await saveTransfers({
    ...ctx,
    block: ctx.blocks[ctx.blocks.length - 1].header,
  }, transfersData);
}

  
  