# Installoop

Simple CLI to recursively install npm dependencies from multiple `package.json`!

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/) `>= 14.x.x`
- [npm](https://npmjs.com/) `>= 8.x.x`

### Installing

```bash
npm install -g installoop
```

## Usage

#### Basic usage

```bash
installoop --rootDir=./
```

#### Skip root `package.json`

```bash
installoop --rootDir=./ --skipRoot
```

#### Include `node_modules`

By default, `node_modules` folders are ignored

```bash
installoop --rootDir=./ --includeModules
```

#### Silent mode

Silent mode won't show you the original `npm install` console outputs.

```bash
installoop --rootDir=./ --silent
```

## Contributing

Pull requests are welcome. 

### Building for production

To run the production build use the npm build script:

```javascript
npm run build
```

Before the build is actually made the tests will be executed, the dist folder will be removed and then the build will be made.

## License
ISC License

Copyright (c) barthofu