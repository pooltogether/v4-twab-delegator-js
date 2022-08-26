import { NETWORK } from '@pooltogether/utilities'

// TODO: This is just for ease of use. This should be expanded to actually read data from the chain.
export const TICKET: {
  [chainId: number]: {
    address: string
    symbol: string
    name: string
    decimals: string
  }
} = Object.freeze({
  [NETWORK.goerli]: {
    address: '0x8537C5a9AAd3ec1D31a84e94d19FcFC681E83ED0',
    symbol: 'TICK',
    name: 'Ticket',
    decimals: '6'
  },
  [NETWORK.mumbai]: {
    address: '0x34445304E2ad5418CD052E6511652a5dA80aA0aE',
    symbol: 'TICK',
    name: 'Ticket',
    decimals: '6'
  },
  [NETWORK.fuji]: {
    address: '0x1758E6930fF20B56f55247b498E0a4dc01360234',
    symbol: 'TICK',
    name: 'Ticket',
    decimals: '6'
  },
  [NETWORK.mainnet]: {
    address: '0xdd4d117723C257CEe402285D3aCF218E9A8236E1',
    symbol: 'PTaUSDC',
    name: 'PoolTogether aUSDC Ticket',
    decimals: '6'
  },
  [NETWORK.polygon]: {
    address: '0x6a304dFdb9f808741244b6bfEe65ca7B3b3A6076',
    symbol: 'PTaUSDC',
    name: 'PoolTogether aUSDC Ticket',
    decimals: '6'
  },
  [NETWORK.avalanche]: {
    address: '0xB27f379C050f6eD0973A01667458af6eCeBc1d90',
    symbol: 'PTavUSDCe',
    name: 'PoolTogether avUSDCe Ticket',
    decimals: '6'
  },
  [NETWORK.optimism]: {
    address: '0x62BB4fc73094c83B5e952C2180B23fA7054954c4',
    symbol: 'PTaOptUSDC',
    name: 'PoolTogether aOptUSDC Ticket',
    decimals: '6'
  },
  [NETWORK['optimism-goerli']]: {
    address: '0x8537C5a9AAd3ec1D31a84e94d19FcFC681E83ED0',
    symbol: 'TICK',
    name: 'Ticket',
    decimals: '6'
  }
})
