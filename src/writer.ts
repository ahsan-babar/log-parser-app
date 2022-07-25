'use strict'

import { writeFile } from "fs";
import path from "path";

export abstract class Writer {
    // writeFile
    // writeToAPI
    // writeToDB
    protected destination!: string;
    abstract write(data: string): Promise<void>;
}


export class LogsFileWriter extends Writer {

    constructor(destination: string) {
        super()
        this.destination = path.resolve(__dirname, destination)
    }

    write(data: string): Promise<void> {
        return new Promise((resolve, reject) => {
            writeFile(this.destination, data, (err: Error | null) => {
                if (err) reject(`Error occurred while writing to file. ${err.toString()}`)
                resolve()
            })

        })
    }
}
