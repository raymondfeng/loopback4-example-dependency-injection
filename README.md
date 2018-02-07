# loopback4-example-di

This repo contains a few examples to illustrate how LoopBack 4 resolves context
bindings and dependency injections.

1. [src/circular-deps.ts](src/circular-deps.ts): detect circular dependencies
2. [src/resolution-path.ts](src/resolution-path.ts): access resolution path
3. [src/inject-path.ts](src/inject-path.ts): inject resolution path
4. [src/async-resolution.ts](src/async-resolution.ts): async resolution

## Install

```sh
git clone git@github.com:raymondfeng/loopback4-example-di.git
cd loopback4-example-di
npm i
```

## Usage
```
node . <appId>
```

## License

MIT
