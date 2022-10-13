import { existsSync } from "fs"
import { readdir } from "fs/promises"
import { resolve } from "path"

export async function getPackages(dirPath: string, includeModules: boolean, skipRoot: boolean = false): Promise<string[]> {
    
    let output: string[] = []

    if (!existsSync(dirPath)) return []
    
    const paths = await readdir(dirPath, { withFileTypes: true })
    
    for (const path of paths) {
        
        const res = resolve(dirPath, path.name)
        
        if (path.isDirectory() && (includeModules || path.name !== 'node_modules')) {
            output.push(...(await getPackages(res, includeModules)))
        } else {
            if (skipRoot === false && path.name === "package.json") output.push(res)
        }
    }

    return output
}