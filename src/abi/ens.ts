import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ens.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: ethers.BigNumber] & {owner: string, spender: string, value: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Claim: new LogEvent<([claimant: string, amount: ethers.BigNumber] & {claimant: string, amount: ethers.BigNumber})>(
        abi, '0x47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4'
    ),
    DelegateChanged: new LogEvent<([delegator: string, fromDelegate: string, toDelegate: string] & {delegator: string, fromDelegate: string, toDelegate: string})>(
        abi, '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'
    ),
    DelegateVotesChanged: new LogEvent<([delegate: string, previousBalance: ethers.BigNumber, newBalance: ethers.BigNumber] & {delegate: string, previousBalance: ethers.BigNumber, newBalance: ethers.BigNumber})>(
        abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    ),
    MerkleRootChanged: new LogEvent<([merkleRoot: string] & {merkleRoot: string})>(
        abi, '0x1b930366dfeaa7eb3b325021e4ae81e36527063452ee55b86c95f85b36f4c31c'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: ethers.BigNumber] & {from: string, to: string, value: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, ethers.BigNumber>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: ethers.BigNumber], {spender: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    checkpoints: new Func<[account: string, pos: number], {account: string, pos: number}, ([fromBlock: number, votes: ethers.BigNumber] & {fromBlock: number, votes: ethers.BigNumber})>(
        abi, '0xf1127ed8'
    ),
    claimPeriodEnds: new Func<[], {}, ethers.BigNumber>(
        abi, '0x66deac47'
    ),
    claimTokens: new Func<[amount: ethers.BigNumber, delegate: string, merkleProof: Array<string>], {amount: ethers.BigNumber, delegate: string, merkleProof: Array<string>}, []>(
        abi, '0x76122903'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0xdd62ed3e'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: ethers.BigNumber], {spender: string, subtractedValue: ethers.BigNumber}, boolean>(
        abi, '0xa457c2d7'
    ),
    delegate: new Func<[delegatee: string], {delegatee: string}, []>(
        abi, '0x5c19a95c'
    ),
    delegateBySig: new Func<[delegatee: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string], {delegatee: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xc3cda520'
    ),
    delegates: new Func<[account: string], {account: string}, string>(
        abi, '0x587cde1e'
    ),
    getPastTotalSupply: new Func<[blockNumber: ethers.BigNumber], {blockNumber: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x8e539e8c'
    ),
    getPastVotes: new Func<[account: string, blockNumber: ethers.BigNumber], {account: string, blockNumber: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x3a46b1a8'
    ),
    getVotes: new Func<[account: string], {account: string}, ethers.BigNumber>(
        abi, '0x9ab24eb0'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: ethers.BigNumber], {spender: string, addedValue: ethers.BigNumber}, boolean>(
        abi, '0x39509351'
    ),
    isClaimed: new Func<[index: ethers.BigNumber], {index: ethers.BigNumber}, boolean>(
        abi, '0x9e34070f'
    ),
    merkleRoot: new Func<[], {}, string>(
        abi, '0x2eb4a7ab'
    ),
    minimumMintInterval: new Func<[], {}, ethers.BigNumber>(
        abi, '0x515b612a'
    ),
    mint: new Func<[dest: string, amount: ethers.BigNumber], {dest: string, amount: ethers.BigNumber}, []>(
        abi, '0x40c10f19'
    ),
    mintCap: new Func<[], {}, ethers.BigNumber>(
        abi, '0x76c71ca1'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nextMint: new Func<[], {}, ethers.BigNumber>(
        abi, '0xcf665443'
    ),
    nonces: new Func<[owner: string], {owner: string}, ethers.BigNumber>(
        abi, '0x7ecebe00'
    ),
    numCheckpoints: new Func<[account: string], {account: string}, number>(
        abi, '0x6fcfff45'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    permit: new Func<[owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string], {owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setMerkleRoot: new Func<[_merkleRoot: string], {_merkleRoot: string}, []>(
        abi, '0x7cb64759'
    ),
    sweep: new Func<[dest: string], {dest: string}, []>(
        abi, '0x01681a62'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[recipient: string, amount: ethers.BigNumber], {recipient: string, amount: ethers.BigNumber}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[sender: string, recipient: string, amount: ethers.BigNumber], {sender: string, recipient: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    DOMAIN_SEPARATOR(): Promise<string> {
        return this.eth_call(functions.DOMAIN_SEPARATOR, [])
    }

    allowance(owner: string, spender: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    balanceOf(account: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [account])
    }

    checkpoints(account: string, pos: number): Promise<([fromBlock: number, votes: ethers.BigNumber] & {fromBlock: number, votes: ethers.BigNumber})> {
        return this.eth_call(functions.checkpoints, [account, pos])
    }

    claimPeriodEnds(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.claimPeriodEnds, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    delegates(account: string): Promise<string> {
        return this.eth_call(functions.delegates, [account])
    }

    getPastTotalSupply(blockNumber: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getPastTotalSupply, [blockNumber])
    }

    getPastVotes(account: string, blockNumber: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getPastVotes, [account, blockNumber])
    }

    getVotes(account: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getVotes, [account])
    }

    isClaimed(index: ethers.BigNumber): Promise<boolean> {
        return this.eth_call(functions.isClaimed, [index])
    }

    merkleRoot(): Promise<string> {
        return this.eth_call(functions.merkleRoot, [])
    }

    minimumMintInterval(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.minimumMintInterval, [])
    }

    mintCap(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.mintCap, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nextMint(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.nextMint, [])
    }

    nonces(owner: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.nonces, [owner])
    }

    numCheckpoints(account: string): Promise<number> {
        return this.eth_call(functions.numCheckpoints, [account])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }
}
