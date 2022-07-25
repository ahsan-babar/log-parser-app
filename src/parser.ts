'use strict'

import { CLI } from "./cli"
import { LogsFileReader, Reader } from "./reader"
import { StringToJsonLogTransformer } from "./transformer"
import { CLIOptions } from "./types"
import { LogsFileWriter, Writer } from "./writer"

abstract class Parser {

    protected reader: Reader
    protected writer: Writer

    constructor(reader: Reader, writer: Writer) {
        this.reader = reader
        this.writer = writer
    }

    async parse(): Promise<void> {
        const data = await this.reader.read()
        await this.writer.write(data)
    }
}

class LogParser extends Parser {

    constructor(cliOptions: Partial<CLIOptions>) {
        super(
            new LogsFileReader(cliOptions.input as string, new StringToJsonLogTransformer('error', '\n')),
            new LogsFileWriter(cliOptions.output as string)
        )
    }
}

const cli: CLI = new CLI(process.argv.slice(2))
const cliOptions: Partial<CLIOptions> = cli.getOptions()

const logParser: LogParser = new LogParser(cliOptions)
logParser.parse()
