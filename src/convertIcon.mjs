import { parse } from 'node-html-parser';
import * as fs from 'node:fs/promises'
import * as path from 'node:path';
import Handlebars from "handlebars";

import config from "./configuration.mjs"
import logger from "./logger.mjs";
import * as fsUtils from "./fsUtils.mjs"

const PROTECTED_ATTRIBUTES = ['class', 'width', 'height', 'fill']

let template = undefined

const loadTemplate = async () => {
    if (template) {
        return template
    }

    const content = await fs.readFile(path.join(config.workingDir, 'src/partial.svg.template'), { encoding: 'utf8' })
    template = Handlebars.compile(content)
    return template
}

export default async ({ filename, dirname, fullPath }) => {
    logger.debug('Processing', fullPath)
    const outputDir = path.resolve(config.outputDir, dirname)

    await fsUtils.mkdir(outputDir)

    const htmlString = await fs.readFile(fullPath)
    const html = parse(htmlString)

    PROTECTED_ATTRIBUTES.forEach((attr) => {
        html.querySelectorAll(`[${attr}]`).forEach((node) => {
            node.removeAttribute(attr)
        })
    })

    const attributes = Object.keys(html.firstChild.attributes)
        .reduce((str, key) => `${str} ${key}="${html.firstChild.attributes[key]}"`, '').trim()
    const template = await loadTemplate()
    const svg = template({ attributes, content: html.firstChild.innerHTML.trim() })

    await fs.writeFile(path.join(outputDir, filename), svg, { encoding: 'utf8' })
}
