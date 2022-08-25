import { NETWORK } from '@pooltogether/utilities'

export const TWAB_DELEGATOR_ADDRESS: { [chainId: number]: string } = Object.freeze({
  [NETWORK.goerli]: '0xb38e46EBf90888D621Cde5661D3cC2476d7bCc2e',
  [NETWORK.mumbai]: '0xaAc4688AB7AD2c0CbC51E9674D53Bf394910aF6a',
  [NETWORK.fuji]: '0xdB4B551C21860028c4CA951CC7067699eB7c5Bfe',
  [NETWORK.avalanche]: '0xd23723fef8A16B77eaDc1fC822aE4170bA9d4009',
  [NETWORK.mainnet]: '0x5cFbEE38362B9A60be276763753f64245EA990F7',
  [NETWORK.polygon]: '0x89Ee77Ce3F4C1b0346FF96E3004ff7C9f972dEF8',
  [NETWORK.optimism]: '0x469C6F4c1AdA45EB2E251685aC2bf05aEd591E70',
  [NETWORK['optimism-goerli']]: '0x6176776490147b41813C1a0e342080d2CAA4e618'
})

export const SUPPORTED_CHAIN_IDS: Readonly<{
  mainnets: number[]
  testnets: number[]
}> = Object.freeze({
  mainnets: [NETWORK.avalanche, NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism],
  testnets: [NETWORK.goerli, NETWORK.mumbai, NETWORK.fuji, NETWORK['optimism-goerli']]
})

export const ALL_SUPPORTED_CHAIN_IDS: readonly number[] = Object.freeze(
  Object.keys(TWAB_DELEGATOR_ADDRESS).map(Number)
)
