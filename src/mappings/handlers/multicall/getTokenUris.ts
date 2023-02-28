// import { BlockHandlerContext, EvmBlock } from "@subsquid/evm-processor"
// import { Store } from "@subsquid/typeorm-store"
// import { Context } from "vm"
// import { Multicall } from "../../../abi/multicall"
// import * as erc721 from "../../../abi/ERC721"
// import { BigNumber } from "ethers"
// import { Token } from "../../../model"

// export const MULTICALL_ADDRESS = '0x5ba1e12693dc8f9c48aad8770482f4739beed696'
// // const maxHeight = maxBy(transfersData, t => t.block)!.block; 
//     // // query the multicall contract at the max height of the chunk
//     // const multicall = new Multicall(ctx, {height: maxHeight}, MULTICALL_ADDRESS)
  
//     // ctx.log.info(`Calling mutlicall for ${transfersData.length} tokens...`)
//     // call in pages of size 100
//     // const results = await multicall.tryAggregate(
//     //   functions.tokenURI,
//     //   transfersData.map(t => [
//     //     EXOSAMA_NFT_CONTRACT,
//     //     [BigNumber.from(t.tokenId)]
//     //   ] as [string, any[]]),
//     //   100
//     // );
  
//     // results.forEach((res, i) => {
//     //   let t = tokens.get(transfersData[i].tokenId.toString());
//     //   if (t) {
//     //     let uri = '';
//     //     if (res.success) {
//     //       uri = <string>res.value;
//     //     } else if (res.returnData) {
//     //       uri = <string>functions.tokenURI.tryDecodeResult(res.returnData) || '';
//     //     }
//     //   }
//     // });
// async function getTokenUri(ctx:  BlockHandlerContext<Store>, block: EvmBlock, tokenIds: string[]) {
//     let contract = new Multicall(ctx, block, MULTICALL_ADDRESS)

//     let tokenURIs = await contract
//         .tryAggregate(
//             // erc721.functions.tokenURI,
//             // CONTRACT_ADDRESS,
//             tokenIds.map((id) => [CONTRACT_ADDRESS,erc721.functions.tokenURI,BigNumber.from(id)]),
//             1000 // to prevent timeout we will use paggination
//         )
//         .then((rs) => rs.map((r) => (r.success ? r.value : null)))

//     let res: Token[] = new Array(tokenIds.length)
//     for (let i = 0; i < tokenIds.length; i++) {
//         res[i] = new Token({
//             id: tokenIds[i],
//             uri: tokenURIs[i],
//             index: BigInt(tokenIds[i]),
//         })
//     }

//     return res
// }