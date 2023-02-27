import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ERC1155.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    ApprovalForAll: new LogEvent<([account: string, operator: string, approved: boolean] & {account: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    Create: new LogEvent<([_creator: string, _account: string, _id: ethers.BigNumber, _initialSupply: ethers.BigNumber, _maxSupply: ethers.BigNumber, _fractionalized: boolean] & {_creator: string, _account: string, _id: ethers.BigNumber, _initialSupply: ethers.BigNumber, _maxSupply: ethers.BigNumber, _fractionalized: boolean})>(
        abi, '0x30922b4d9cf7a6f89fb8dc7347b5cd29d30c70a9b5e7334cb729eda8393ed400'
    ),
    CreatorGaveUpControl: new LogEvent<([id: ethers.BigNumber, creator: string] & {id: ethers.BigNumber, creator: string})>(
        abi, '0x3e8b979c860e86cd90336318aeb6ba6aefe09f721721cd4bb50ab06da58dd4e3'
    ),
    Lock: new LogEvent<([id: ethers.BigNumber, supply: ethers.BigNumber] & {id: ethers.BigNumber, supply: ethers.BigNumber})>(
        abi, '0x46d326b399b600d54f10f9cc18580fd65427ff111e1ce74350b39e244cbfbcf8'
    ),
    RoleAdminChanged: new LogEvent<([role: string, previousAdminRole: string, newAdminRole: string] & {role: string, previousAdminRole: string, newAdminRole: string})>(
        abi, '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff'
    ),
    RoleGranted: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d'
    ),
    RoleRevoked: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'
    ),
    SecondarySaleFee: new LogEvent<([id: ethers.BigNumber, recipient: string, value: ethers.BigNumber] & {id: ethers.BigNumber, recipient: string, value: ethers.BigNumber})>(
        abi, '0xbeb87044e66ebf56d1fec8f3cfe7338e47f8f5bc32a7188a1e52811102ad7e67'
    ),
    TransferBatch: new LogEvent<([operator: string, from: string, to: string, ids: Array<ethers.BigNumber>, values: Array<ethers.BigNumber>] & {operator: string, from: string, to: string, ids: Array<ethers.BigNumber>})>(
        abi, '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'
    ),
    TransferSingle: new LogEvent<([operator: string, from: string, to: string, id: ethers.BigNumber, value: ethers.BigNumber] & {operator: string, from: string, to: string, id: ethers.BigNumber, value: ethers.BigNumber})>(
        abi, '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
    ),
    URI: new LogEvent<([value: string, id: ethers.BigNumber] & {value: string, id: ethers.BigNumber})>(
        abi, '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b'
    ),
}

export const functions = {
    ADMIN_ROLE: new Func<[], {}, string>(
        abi, '0x75b238fc'
    ),
    DEFAULT_ADMIN_ROLE: new Func<[], {}, string>(
        abi, '0xa217fddf'
    ),
    MINTER_ROLE: new Func<[], {}, string>(
        abi, '0xd5391393'
    ),
    OWNER_ROLE: new Func<[], {}, string>(
        abi, '0xe58378bb'
    ),
    VERSION: new Func<[], {}, string>(
        abi, '0xffa1ad74'
    ),
    balanceOf: new Func<[account: string, id: ethers.BigNumber], {account: string, id: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x00fdd58e'
    ),
    balanceOfBatch: new Func<[accounts: Array<string>, ids: Array<ethers.BigNumber>], {accounts: Array<string>, ids: Array<ethers.BigNumber>}, Array<ethers.BigNumber>>(
        abi, '0x4e1273f4'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    exists: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, boolean>(
        abi, '0x4f558e79'
    ),
    fractionalized: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, boolean>(
        abi, '0xbf2dfc4a'
    ),
    getRoleAdmin: new Func<[role: string], {role: string}, string>(
        abi, '0x248a9ca3'
    ),
    grantRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x2f2ff15d'
    ),
    hasRole: new Func<[role: string, account: string], {role: string, account: string}, boolean>(
        abi, '0x91d14854'
    ),
    idMode: new Func<[], {}, number>(
        abi, '0x153b54a6'
    ),
    initialized: new Func<[], {}, boolean>(
        abi, '0x158ef93e'
    ),
    isApprovedForAll: new Func<[_owner: string, _operator: string], {_owner: string, _operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    isProxy: new Func<[_address: string, _operator: string], {_address: string, _operator: string}, boolean>(
        abi, '0x76d1f139'
    ),
    lock: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, []>(
        abi, '0xdd467064'
    ),
    maxSupply: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x869f7594'
    ),
    mint: new Func<[_account: string, _id: ethers.BigNumber, _amount: ethers.BigNumber, _data: string], {_account: string, _id: ethers.BigNumber, _amount: ethers.BigNumber, _data: string}, []>(
        abi, '0x731133e9'
    ),
    mintBatch: new Func<[_account: string, _ids: Array<ethers.BigNumber>, _amounts: Array<ethers.BigNumber>, _data: string], {_account: string, _ids: Array<ethers.BigNumber>, _amounts: Array<ethers.BigNumber>, _data: string}, []>(
        abi, '0x1f7fdffa'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    proxyRegistry: new Func<[], {}, string>(
        abi, '0xb50cbd9f'
    ),
    renounceRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x36568abe'
    ),
    revokeRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0xd547741f'
    ),
    royaltyInfo: new Func<[_tokenId: ethers.BigNumber, _salePrice: ethers.BigNumber], {_tokenId: ethers.BigNumber, _salePrice: ethers.BigNumber}, ([receiver: string, royaltyAmount: ethers.BigNumber] & {receiver: string, royaltyAmount: ethers.BigNumber})>(
        abi, '0x2a55205a'
    ),
    safeBatchTransferFrom: new Func<[from: string, to: string, ids: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>, data: string], {from: string, to: string, ids: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>, data: string}, []>(
        abi, '0x2eb2c2d6'
    ),
    safeTransferFrom: new Func<[from: string, to: string, id: ethers.BigNumber, amount: ethers.BigNumber, data: string], {from: string, to: string, id: ethers.BigNumber, amount: ethers.BigNumber, data: string}, []>(
        abi, '0xf242432a'
    ),
    secondarySaleFee: new Func<[id: ethers.BigNumber], {id: ethers.BigNumber}, ([recipient: string, value: ethers.BigNumber] & {recipient: string, value: ethers.BigNumber})>(
        abi, '0x4322d9b7'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setContractURI: new Func<[contractURI: string], {contractURI: string}, []>(
        abi, '0x938e3d7b'
    ),
    setSecondarySaleFee: new Func<[_id: ethers.BigNumber, _fee: ([recipient: string, value: ethers.BigNumber] & {recipient: string, value: ethers.BigNumber})], {_id: ethers.BigNumber, _fee: ([recipient: string, value: ethers.BigNumber] & {recipient: string, value: ethers.BigNumber})}, []>(
        abi, '0x0e85ba0f'
    ),
    setTokenURI: new Func<[_id: ethers.BigNumber, newTokenURI: string], {_id: ethers.BigNumber, newTokenURI: string}, []>(
        abi, '0x162094c4'
    ),
    setTokenURIPostfix: new Func<[tokenURIPostfix: string], {tokenURIPostfix: string}, []>(
        abi, '0xb217c964'
    ),
    setTokenURIPrefix: new Func<[tokenURIPrefix: string], {tokenURIPrefix: string}, []>(
        abi, '0x99e0dd7c'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    token: new Func<[_: ethers.BigNumber], {}, ([totalSupply: ethers.BigNumber, maxSupply: ethers.BigNumber, creator: string, locked: boolean] & {totalSupply: ethers.BigNumber, maxSupply: ethers.BigNumber, creator: string, locked: boolean})>(
        abi, '0x044215c6'
    ),
    tokenURIPostfix: new Func<[], {}, string>(
        abi, '0xf3723150'
    ),
    tokenURIPrefix: new Func<[], {}, string>(
        abi, '0xc0ac9983'
    ),
    totalSupply: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0xbd85b039'
    ),
    updateProxyRegistryAddress: new Func<[_proxyRegistryAddress: string], {_proxyRegistryAddress: string}, []>(
        abi, '0x16f6c2da'
    ),
    uri: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, string>(
        abi, '0x0e89341c'
    ),
    uriScheme: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, string>(
        abi, '0x2f434cc3'
    ),
}

export class Contract extends ContractBase {

    ADMIN_ROLE(): Promise<string> {
        return this.eth_call(functions.ADMIN_ROLE, [])
    }

    DEFAULT_ADMIN_ROLE(): Promise<string> {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, [])
    }

    MINTER_ROLE(): Promise<string> {
        return this.eth_call(functions.MINTER_ROLE, [])
    }

    OWNER_ROLE(): Promise<string> {
        return this.eth_call(functions.OWNER_ROLE, [])
    }

    VERSION(): Promise<string> {
        return this.eth_call(functions.VERSION, [])
    }

    balanceOf(account: string, id: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [account, id])
    }

    balanceOfBatch(accounts: Array<string>, ids: Array<ethers.BigNumber>): Promise<Array<ethers.BigNumber>> {
        return this.eth_call(functions.balanceOfBatch, [accounts, ids])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    exists(_id: ethers.BigNumber): Promise<boolean> {
        return this.eth_call(functions.exists, [_id])
    }

    fractionalized(_id: ethers.BigNumber): Promise<boolean> {
        return this.eth_call(functions.fractionalized, [_id])
    }

    getRoleAdmin(role: string): Promise<string> {
        return this.eth_call(functions.getRoleAdmin, [role])
    }

    hasRole(role: string, account: string): Promise<boolean> {
        return this.eth_call(functions.hasRole, [role, account])
    }

    idMode(): Promise<number> {
        return this.eth_call(functions.idMode, [])
    }

    initialized(): Promise<boolean> {
        return this.eth_call(functions.initialized, [])
    }

    isApprovedForAll(_owner: string, _operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [_owner, _operator])
    }

    isProxy(_address: string, _operator: string): Promise<boolean> {
        return this.eth_call(functions.isProxy, [_address, _operator])
    }

    maxSupply(_id: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.maxSupply, [_id])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    proxyRegistry(): Promise<string> {
        return this.eth_call(functions.proxyRegistry, [])
    }

    royaltyInfo(_tokenId: ethers.BigNumber, _salePrice: ethers.BigNumber): Promise<([receiver: string, royaltyAmount: ethers.BigNumber] & {receiver: string, royaltyAmount: ethers.BigNumber})> {
        return this.eth_call(functions.royaltyInfo, [_tokenId, _salePrice])
    }

    secondarySaleFee(id: ethers.BigNumber): Promise<([recipient: string, value: ethers.BigNumber] & {recipient: string, value: ethers.BigNumber})> {
        return this.eth_call(functions.secondarySaleFee, [id])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    token(arg0: ethers.BigNumber): Promise<([totalSupply: ethers.BigNumber, maxSupply: ethers.BigNumber, creator: string, locked: boolean] & {totalSupply: ethers.BigNumber, maxSupply: ethers.BigNumber, creator: string, locked: boolean})> {
        return this.eth_call(functions.token, [arg0])
    }

    tokenURIPostfix(): Promise<string> {
        return this.eth_call(functions.tokenURIPostfix, [])
    }

    tokenURIPrefix(): Promise<string> {
        return this.eth_call(functions.tokenURIPrefix, [])
    }

    totalSupply(_id: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [_id])
    }

    uri(_id: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.uri, [_id])
    }

    uriScheme(_id: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.uriScheme, [_id])
    }
}
