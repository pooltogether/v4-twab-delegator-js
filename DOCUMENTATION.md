# Delegator Library

This library includes a simplified interface for interacting with a v4 PoolTogether TWAB Delegator deployment.

- [TwabDelegator](./Classes/PrizePoolNetwork/)

## 💾 &nbsp; Installation

This project is available as an NPM package:

```sh
npm install @pooltogether/v4-twab-delegator-js
```

or

```sh
yarn add @pooltogether/v4-twab-delegator-js
```

The repo can be cloned from Github for contributions.

```sh
git clone https://github.com/pooltogether/v4-twab-delegator-js.git
```

## 🏎️ &nbsp; Quickstart

### TwabDelegator

A `TwabDelegator` is a wrapper on an ethers `Contract` with utility functions.

To create an instance of `TwabDelegator` you will need:

- [Ethers providers](https://docs.ethers.io/v5/api/providers/) for every chain that you want to interact with.

```js
import { TwabDelegator, deployments } from '@pooltogether/v4-twab-delegator-js'
import { mainnet } from '@pooltogether/v4-pool-data'

const provider = getProvider(CHAIN_ID.mainnet)
const delegator = new TwabDelegator(provider, deployments[CHAIN_ID.mainnet])
```

> NOTE: This interface will change in the future. A chain id is not a sufficient key once the protocol expands to multiple Prize Pools.
