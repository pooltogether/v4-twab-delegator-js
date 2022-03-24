import { BigNumber } from '@ethersproject/bignumber'

export interface Delegation {
  balance: BigNumber
  delegatee: string
  delegation: string
  length: number
  lockUntil: BigNumber
  wasCreated: boolean
}

export interface DelegationId {
  delegator: string
  slot: BigNumber
}

export interface DelegationUpdate extends DelegationId {
  delegatee: string
  lockDuration: number
}

export interface DelegationFund extends DelegationId {
  amount: BigNumber
}
