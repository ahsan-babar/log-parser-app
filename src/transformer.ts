'use strict'

import { Log, LogKeysEnum, LogLevel, LogReadFormat } from "./types"
import { pick } from 'lodash'
export abstract class Transformer {
    // CsvToJson
    // CsvToXml
    // JsonToXml
    // JsonToCsv
    abstract transform(data: string | object): Log | null;
}


export class StringToJsonLogTransformer extends Transformer {

    private logLevel!: LogLevel
    private seperator!: string

    constructor(logLevel: LogLevel, seperator: string) {
        super()
        this.logLevel = logLevel
        this.seperator = seperator
    }

    transform(data: LogReadFormat): Log | null {
        const [timestamp, loglevel, log]: string[] = data.toString().split(" - ")
        if (loglevel.trim() === this.logLevel) {

            const obj = {
                timestamp,
                loglevel,
                ...(pick(JSON.parse(log.split(this.seperator)[0]), Object.keys(LogKeysEnum)))
            }
            return obj as Log
        }
        return null
    }
}