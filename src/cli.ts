'use strict'

import { CLIFlag, CLIOptions } from "./types"

export class CLI {

    private options: Partial<CLIOptions> = {};

    constructor(argv: string[]) {

        for (let i = 0; i < argv.length; i++) {

            if (argv[i].startsWith('--')) {
                this.options[this.trimFlag(argv[i])] = true
            }
            else if (i > 0 && argv[i - 1].startsWith('--')) {
                this.options[this.trimFlag(argv[i - 1])] = argv[i]
            }
            else {
                throw new Error(`Bad request: ${argv.join(' ')}`)
            }
        }
    }

    private trimFlag(flag: string): CLIFlag {
        return flag.split('--')[1] as CLIFlag
    }

    getOptions(): Partial<CLIOptions> {
        return this.options
    }
}
