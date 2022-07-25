'use strict'

import { createReadStream, createWriteStream, existsSync } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";

const argv = process.argv.slice(2)

const trimFlag = (flag: string) => flag.split('--')[1]

const options: any = {}
for (let i = 0; i < argv.length; i++) {


    if (argv[i].startsWith('--')) {
        options[trimFlag(argv[i])] = true
    }
    else if (i > 0 && argv[i - 1].startsWith('--')) {
        options[trimFlag(argv[i - 1])] = argv[i]
    }
    else {
        throw new Error(`Bad request: ${argv.join(' ')}`)
    }

}

const { input, output } = options
const inputPath = resolve(__dirname, '..', input)

if (!existsSync(inputPath)) throw ('File not found!')
const rl = createInterface({
    input: createReadStream(resolve(inputPath)),
    output: createWriteStream(resolve(__dirname, '..', output)),
    crlfDelay: Infinity
});

let sep = ''

function transformOnce(this: any, data: any) {
    this.output.write("[");
}

function transform(this: any, data: any) {
    const [timestamp, loglevel, log] = data.toString().split(" - ")
    if (loglevel.trim() === 'error') {

        const obj = {
            timestamp,
            loglevel,
            ...JSON.parse(log.split('\n')[0])
        }
        this.output.write(sep + JSON.stringify(obj));
        if (!sep) sep = ",\n";
    }
}

function transformFinish(this: any, data: any) {
    this.output.write("]")
}

rl.once('line', transformOnce)
    .on('line', transform)
    .once('close', transformFinish)
    .on('close', function () {
        console.log(`Created `);
    });
