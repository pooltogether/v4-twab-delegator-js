import { DelegationId } from '../interfaces'

export function findDelegationData<T extends DelegationId>(
  delegationId: DelegationId,
  delegations: T[]
) {
  return delegations.find(
    (delegation) =>
      delegation.slot.eq(delegationId.slot) && delegation.delegator === delegationId.delegator
  )
}
