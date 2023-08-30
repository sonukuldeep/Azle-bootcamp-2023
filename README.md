# Azle bootcamp 2023

## Website
Live website is deployed on IC [here](https://ela5b-4yaaa-aaaap-abi2a-cai.icp0.io/)

This website includes the below feature:
- [x] Authentication
- [x] DAO voting
- [x] Token transfer
- [x] Stable memory used
- [x] Deployed on IC with source code on Github
- [x] Using azle as backend to talk to canisters

## Getting started

Make sure that [Node.js](https://nodejs.org/en/) `>= 16.x` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14.x` are installed on your system.

Run the following commands to deploy locally:
```sh
dfx start --background # Run dfx in the background
npm run setup # Install packages, deploy canisters, and generate type bindings
npm start # Start the development server
```

Run the following commands to deploy on IC:
```sh
dfx deploy --network ic
```
It is likely the above command may fail. If this is the case check the code again

Try deploying canisters one at a time. Sometimes it fails for no reason
```sh
dfx deploy <canister name> --network ic
```

## Check website
- [Candid ui on IC](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/)   &lt;-- you will need backend canister id
- Frontend address https://&lt;frontend canister id&gt;.icp0.io/

## Technology Stack

- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development
- [React](https://reactjs.org/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Sass](https://sass-lang.com/): an extended syntax for CSS stylesheets
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Azle](https://github.com/demergent-labs/azle): a TypeScript CDK for the Internet Computer

## Documentation

- [Vite developer docs](https://vitejs.dev/guide/)
- [React quick start guide](https://beta.reactjs.org/learn)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Azle Book](https://demergent-labs.github.io/azle/)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)

## Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.
