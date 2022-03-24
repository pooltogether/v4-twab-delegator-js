<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="200">
  </a>
</p>

<br />

# 💻 &nbsp; PoolTogether Delegator Library || PoolTogether V4

![Tests](https://github.com/pooltogether/v4-twab-delegator-js/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-client-js/badge.svg?branch=main)](https://coveralls.io/github/pooltogether/v4-client-js?branch=main)
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![MIT license](https://img.shields.io/npm/l/@pooltogether/v4-client-js)](https://img.shields.io/npm/l/@pooltogether/v4-client-js)
![npm](https://img.shields.io/npm/v/@pooltogether/v4-client-js)

[Application](https://app.pooltogether.com/) | [Client](https://github.com/pooltogether/v4-client-js) | [Contracts](https://github.com/pooltogether/v4-core) | [Documentation](https://dev.docs.pooltogether.com/) | [Draw Calculator](https://github.com/pooltogether/draw-calculator-cli) | [Utility Library](https://github.com/pooltogether/v4-utils-js) | [Static Cache](https://github.com/pooltogether/v4-draw-results)

# 🏆 &nbsp; Overview

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

#### ESLint

The TSDX linting configuration is overwritten to include override(s)\* for:

- Import/Order (used to enforce consistent module import ordering)

###### \*The ESLint overrides may incorrectly be interpreted by VSCode since the nested config file is ignored in the IDE

### Porting docs to PoolTogether V4 Docs

1. `yarn docs`
2. Copy & paste

- `classes` to `Classes`
- `interfaces` to `Interfaces`
- `README.md` below header to `index.md`

3. Replace all `.md` with `` (nothing) in links
4. Replace all `README` links to `./` and `../README` to `../`
