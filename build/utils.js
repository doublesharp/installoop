"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackages = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
async function getPackages(dirPath, includeModules, skipRoot = false) {
    let output = [];
    if (!(0, fs_1.existsSync)(dirPath))
        return [];
    const paths = await (0, promises_1.readdir)(dirPath, { withFileTypes: true });
    for (const path of paths) {
        const res = (0, path_1.resolve)(dirPath, path.name);
        if (path.isDirectory() && (includeModules || path.name !== 'node_modules')) {
            output.push(...(await getPackages(res, includeModules)));
        }
        else {
            if (skipRoot === false && path.name === 'package.json')
                output.push(res);
        }
    }
    return output;
}
exports.getPackages = getPackages;
