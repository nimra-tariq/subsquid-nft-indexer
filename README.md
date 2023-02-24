
# ERC721 transfers indexing squid

This example squid indexes ERC721 transfers by tracking the historical `Transfer(address,address,uint256)` logs emitted by the ERC721 BASED TOKENS on the Ethereum Mainnet. 

One can use this example as a template for scaffolding a new squid project with [`sqd init`](https://docs.subsquid.io/squid-cli/):


## Prerequisites

- Node v16.x
- Docker
- [Squid CLI](https://docs.subsquid.io/squid-cli/)

## Running 

Navigate to the example folder.

```bash
npm ci
sqd build
# start the database
sqd up
# starts a long-running ETL and blocks the terminal
sqd process

# starts the GraphQL API server at localhost:4350/graphql
sqd serve
```
