#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const spawnise_1 = require("spawnise");
const utils_1 = require("./utils");
(async () => {
    let paths = [];
    // define CLI arguments
    const args = (0, arg_1.default)({
        '--rootDir': [String],
        '--includeModules': Boolean,
        '--skipRoot': Boolean,
        '--silent': Boolean
    });
    // throw error if no rootDir is provided
    if (!args['--rootDir'])
        throw new Error('No root directory specified');
    // get path of all package.json
    for (const dir of args['--rootDir']) {
        const packages = await (0, utils_1.getPackages)(dir, !!args['--includeModules'], args['--skipRoot']);
        paths.push(...packages);
    }
    // run npm install for each path
    console.log(`Found ${paths.length} package.json\n`);
    for (const path of paths) {
        const pathWithoutPackage = path.slice(0, -12);
        console.log('-'.repeat(process.stdout.columns));
        console.log(`\nInstalling ${pathWithoutPackage} packages...\n`);
        await (0, spawnise_1.spawn)('npm', ['install'], {
            env: process.env,
            cwd: pathWithoutPackage,
            stdio: args['--silent'] ? 'ignore' : 'inherit'
        });
    }
    if (paths.length > 0) {
        console.log('-'.repeat(process.stdout.columns));
        console.log(`\nInstalled npm packages from ${paths.length} package.json!\n`);
    }
})();
