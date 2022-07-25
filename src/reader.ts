'use strict'

import { createReadStream, existsSync } from "fs";
import path from "path";
import { createInterface } from "readline";
import { Transformer } from "./transformer";
import { Log, LogReadFormat } from "./types";


export abstract class Reader {
    // readFile
    // downloadFile
    // readFromAPI
    // readFromDB
    protected source!: string;
    protected transformer!: Transformer;
    abstract read(): Promise<string>;
}


export class LogsFileReader extends Reader {

    constructor(source: string, transformer: Transformer) {
        super()
        this.source = path.resolve(__dirname, source)
        this.transformer = transformer
    }

    read(): Promise<string> {

        return new Promise((resolve, reject) => {

            const logs: Log[] = []

            if (!existsSync(this.source)) reject('File not found!')

            createInterface({
                input: createReadStream(this.source),
                crlfDelay: Infinity
            })
                .on('line', (data: LogReadFormat) => {
                    const transformed = this.transformer.transform(data)
                    transformed && logs.push(transformed as Log)
                })
                .once('close', () => {
                    resolve(JSON.stringify(logs))
                })
        })

    }

}




