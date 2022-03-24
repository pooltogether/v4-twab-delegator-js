import { Provider } from '@ethersproject/abstract-provider'
import { Signer, BigNumber, Contract } from 'ethers'
import { batch, contract, MulticallContract } from '@pooltogether/etherplex'
import TwabDelegatorAbi from './abis/TwabDelegator'
import { Delegation, DelegationId } from './interfaces'
import { TICKET } from './constants/ticket'

/**
 *
 */
export class TwabDelegator {
  readonly providerOrSigner: Provider | Signer
  readonly chainId: number
  readonly address: string
  readonly contract: Contract
  readonly etherplexContract: MulticallContract

  /**
   *
   * @param chainId
   * @param providerOrSigner
   * @param address
   */
  constructor(chainId: number, providerOrSigner: Provider | Signer, address: string) {
    this.providerOrSigner = providerOrSigner
    this.chainId = chainId
    this.address = address
    this.contract = new Contract(address, TwabDelegatorAbi, providerOrSigner)
    this.etherplexContract = contract(address, TwabDelegatorAbi, address)
  }

  //////////////////////////// Ethers write functions ////////////////////////////

  // TODO: This gets a little tricky if we want nice toast callbacks for the signature. Waiting until it's needed to implement.
  // async updateDelegations(
  //   delegator: string,
  //   delegations: (Delegation & DelegationId)[],
  //   delegationCreations: DelegationUpdate[],
  //   delegationUpdates: DelegationUpdate[],
  //   delegationWithdrawals: DelegationFund[],
  //   delegationFunds: DelegationFund[],
  //   allowance: BigNumber,
  //   callbacks?: {
  //     onSignaturePending?: () => void
  //     onSignatureRejected?: () => void
  //   }
  // ): Promise<TransactionResponse> {
  //   // TODO: Validate that it is a signer
  //   const signer = this.providerOrSigner as Signer
  //   if (!signer.provider) {
  //     throw new Error('NO PROVIDER')
  //   }
  //   const ticketContract = getTicketContract(this.chainId)
  //   const fnCalls: string[] = []
  //   let totalAmountToFund = BigNumber.from(0)

  //   // Add creations to the list of transactions
  //   for (const delegationCreation of delegationCreations) {
  //     const { slot, delegatee, lockDuration } = delegationCreation
  //     const populatedTx = await this.contract.populateTransaction.createDelegation(
  //       delegator,
  //       slot,
  //       delegatee,
  //       lockDuration
  //     )
  //     if (populatedTx.data) {
  //       fnCalls.push(populatedTx.data)
  //     }
  //   }

  //   // Add updates to the list of transactions
  //   for (const delegationUpdate of delegationUpdates) {
  //     const { slot, delegatee, lockDuration } = delegationUpdate
  //     const populatedTx = await this.contract.populateTransaction.updateDelegatee(
  //       delegator,
  //       slot,
  //       delegatee,
  //       lockDuration
  //     )
  //     if (populatedTx.data) {
  //       fnCalls.push(populatedTx.data)
  //     }
  //   }

  //   // Add withdrawals to the list of transactions
  //   for (const delegationWithdrawal of delegationWithdrawals) {
  //     const { slot, amount } = delegationWithdrawal
  //     const delegation = findDelegationData(delegationWithdrawal, delegations)
  //     if (delegation) {
  //       const amountToWithdraw = delegation.balance.sub(amount)
  //       const populatedTx = await this.contract.populateTransaction.transferDelegationTo(
  //         slot,
  //         amountToWithdraw,
  //         delegator
  //       )
  //       if (populatedTx.data) {
  //         fnCalls.push(populatedTx.data)
  //       }
  //     } else {
  //       throw new Error('tried to withdraw but there was no delegation available to withdraw from')
  //     }
  //   }

  //   // Add funds to the list of transactions
  //   for (const delegationFund of delegationFunds) {
  //     const { slot, amount } = delegationFund
  //     const delegation = findDelegationData(delegationFund, delegations)
  //     let amountToFund: BigNumber

  //     // If there's an existing delegation, amountToFund is the difference
  //     if (!!delegation) {
  //       amountToFund = amount.sub(delegation.balance)
  //     } else {
  //       amountToFund = amount
  //     }

  //     let populatedTx: PopulatedTransaction
  //     if (amountToFund.isNegative()) {
  //       const amountToWithdraw = amountToFund.mul(-1)
  //       populatedTx = await this.contract.populateTransaction.transferDelegationTo(
  //         slot,
  //         amountToWithdraw,
  //         delegator
  //       )
  //     } else {
  //       totalAmountToFund = totalAmountToFund.add(amountToFund)
  //       populatedTx = await this.contract.populateTransaction.fundDelegation(
  //         delegator,
  //         slot,
  //         amountToFund
  //       )
  //     }
  //     if (populatedTx.data) {
  //       fnCalls.push(populatedTx.data)
  //     }
  //   }

  //   // Ensure allowance is high enough. Get signature for permitAndMulticall.
  //   if (!totalAmountToFund.isZero() && allowance.lt(totalAmountToFund)) {
  //     callbacks?.onSignaturePending?.()

  //     const amountToIncrease = totalAmountToFund.sub(allowance)
  //     const domain = {
  //       name: 'PoolTogether ControlledToken',
  //       version: '1',
  //       chainId: this.chainId,
  //       verifyingContract: ticketContract.address
  //     }

  //     // NOTE: Nonce must be passed manually for signERC2612Permit to work with WalletConnect
  //     const deadline = (await signer.provider.getBlock('latest')).timestamp + 5 * 60
  //     const response = await ticketContract.functions.nonces(delegator)
  //     const nonce: BigNumber = response[0]

  //     const signaturePromise = signERC2612Permit(
  //       signer,
  //       domain,
  //       delegator,
  //       this.address,
  //       amountToIncrease.toString(),
  //       deadline,
  //       nonce.toNumber()
  //     ).catch(() => callbacks?.onSignatureRejected?.())

  //     try {
  //       // TODO: Signature rejected with wallet connect provider. `_provider.send` is unavailable. Maybe try to switch to WAGMI or fiddle with web3-react connectors...
  //       const signature = await signaturePromise

  //       return twabDelegatorContract.permitAndMulticall(
  //         amountToIncrease,
  //         {
  //           deadline: signature.deadline,
  //           v: signature.v,
  //           r: signature.r,
  //           s: signature.s
  //         },
  //         fnCalls
  //       )
  //     } catch (e) {
  //       setSignaturePending(false)
  //       console.error(e)
  //       return
  //     }
  //   } else {
  //     return twabDelegatorContract.multicall(fnCalls)
  //   }
  // }

  //////////////////////////// Ethers read functions ////////////////////////////

  /**
   *
   * @returns
   */
  async getMaxLockDuration(): Promise<BigNumber> {
    const response = await this.contract.functions.MAX_LOCK()
    const maxLockDurationBN: BigNumber = response[0]
    return maxLockDurationBN
  }

  /**
   * TODO: Make this actually read chain data
   * @returns
   */
  async getTicket(): Promise<{
    address: string
    symbol: string
    name: string
    decimals: string
  }> {
    return TICKET[this.chainId]
  }

  /**
   *
   * @param page
   * @param pageSize
   */
  async getDelegationsByPage(
    delegator: string,
    page: number,
    pageSize: number = 25
  ): Promise<(Delegation & DelegationId)[]> {
    const offset = page * pageSize
    let batchCalls = []
    for (let i = 0; i < pageSize; i++) {
      const slotIndex = i + offset
      const etherplexContract = contract(slotIndex.toString(), TwabDelegatorAbi, this.address)
      // @ts-ignore
      batchCalls.push(etherplexContract.getDelegation(delegator, slotIndex))
    }
    const delegationsWithIds: (Delegation & DelegationId)[] = []

    const provider = this.getProvider()
    let response = await batch(provider, ...batchCalls)
    const slotIndices = Object.keys(response)

    slotIndices.forEach((slotIndex) => {
      const delegationResponse: Delegation = response[slotIndex].getDelegation
      // If the delegation was created, not just the initial 0 address state
      if (delegationResponse.wasCreated) {
        const delegationWithId: Delegation & DelegationId = {
          balance: delegationResponse.balance,
          delegatee: delegationResponse.delegatee,
          delegation: delegationResponse.delegation,
          length: delegationResponse.length,
          lockUntil: delegationResponse.lockUntil,
          wasCreated: delegationResponse.wasCreated,
          slot: BigNumber.from(slotIndex),
          delegator
        }
        delegationsWithIds.push(delegationWithId)
      }
    })
    return delegationsWithIds
  }

  //////////////////////////// Ethers read functions ////////////////////////////

  getProvider(): Provider {
    if (this.providerOrSigner instanceof Signer) {
      if (!this.providerOrSigner.provider) {
        throw new Error('No provider')
      }
      return this.providerOrSigner.provider
    }

    return this.providerOrSigner
  }
}
