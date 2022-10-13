#!/usr/bin/env node

import arg from 'arg'
import { spawn } from 'spawnise'

import { getPackages } from './utils'

(async () => {

    let paths: string[] = []

    // define CLI arguments
    const args = arg({
        '--rootDir': [String],
        '--includeModules': Boolean,
        '--skipRoot': Boolean,
        '--silent': Boolean
    })

    // throw error if no rootDir is provided
    if (!args['--rootDir']) throw new Error('No root directory specified')

    // get path of all package.json
    for (const dir of args['--rootDir']) {
        
        const packages = await getPackages(dir, !!args['--includeModules'], args['--skipRoot'])
        paths.push(...packages)
    }

    // run npm install for each path
    console.log(`Found ${paths.length} package.json\n`)

    for (const path of paths) {

        const pathWithoutPackage = path.slice(0, -12)
        
        console.log('-'.repeat(process.stdout.columns))
        console.log(`\nInstalling ${pathWithoutPackage} packages...\n`)
        
        await spawn('npm install', {
            cwd: pathWithoutPackage,
            stdio: args['--silent'] ? 'ignore' : 'inherit'
        })
    }
    
    if (paths.length > 0) {
        console.log('-'.repeat(process.stdout.columns))
        console.log(`\nInstalled npm packages from ${paths.length} package.json!\n`)
    }

})()
