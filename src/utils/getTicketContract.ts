import { Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'

import TicketAbi from '@abis/Ticket'
import { getReadProvider } from '@pooltogether/utilities'
import { getTicketContractAddress } from '@utils/getTicketContractAddress'

export const getTicketContract = (
  chainId: number,
  _providerOrSigner?: Provider | Signer
): Contract => {
  const ticketAddress = getTicketContractAddress(chainId)
  const providerOrSigner = _providerOrSigner || getReadProvider(chainId)
  return new ethers.Contract(ticketAddress, TicketAbi, providerOrSigner)
}
