import process from 'node:process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { glob } from "glob"
import yargs from "yargs"

const argv = yargs(process.argv.slice(2)).argv

import { setConfig } from "./configuration.mjs"
setConfig({ verbose: argv.verbose })

import * as fsUtils from "./fsUtils.mjs"
import logger from "./logger.mjs";
import convertIcon from "./convertIcon.mjs";

const workingDir = process.cwd()
const inputPath = 'heroicons/src'
const outputPath = 'layouts/partials/heroicons'
const inputDir = path.join(workingDir, inputPath)
const outputDir = path.join(workingDir, outputPath)

if (fsUtils.doesExist(outputDir)) {
    logger.info('Cleaning output directory')
    const outputFiles = await glob(path.join(outputDir, '**/*.svg'))

    for (const file of outputFiles) {
        await fs.unlink(file)
    }
} else {
    await fs.mkdir(outputDir)
}

const files = await glob(path.join(inputDir, '**/*.svg'))

if (files.length === 0) {
    logger.error('!!! Could not find the Hero Icons under "heroicons/src". Make sure the Hero Icon submodule is cloned.')
    process.exit(1)
}

for(const file of files) {
    await convertIcon({
        fullPath: file,
        filename: path.basename(file),
        dirname: path.relative(inputDir, path.dirname(file))
    })
}
