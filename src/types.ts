'use strict'


export type CLIFlag = 'input' | 'output'

export type CLIOptions = Record<CLIFlag, string | boolean>

export type LogLevel = 'info' | 'debug' | 'error' | 'warn'

// `2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}`
export type LogReadFormat = `${string} - ${string} - ${string}`

export enum LogKeysEnum {
    timestamp = 'timestamp',
    loglevel = 'loglevel',
    transactionId = 'transactionId',
    err = 'err'
}

export interface Log {
    timestamp: string
    loglevel: string
    transactionId: string
    err: string
}
