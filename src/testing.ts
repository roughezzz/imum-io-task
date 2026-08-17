import { warningMessage } from './utils';

import yargs from 'yargs'
import { functions } from './sites'
import { CommonInterface } from './sites/interfaces'
import { sources } from './sites/sources';

function getSourceFunction(source:sources): CommonInterface {
    if (!functions[source]) {
        throw new Error(`No functions for source ${source}`)
    }

    let currentClass = functions[source]
    let sourceFunctions: CommonInterface = new currentClass()
    return sourceFunctions
}

async function testing(source: any) {
    if (source) {
        const sourceFunctions = getSourceFunction(source)
        if (sourceFunctions.testing) {
            await sourceFunctions.testing();
        } else {
            warningMessage("Your source file has no testing function. Please add one.");
        }
    } else {
        warningMessage("Please provide a source. without source cannnot start debugging");
    }
}

async function startActivity() {

    const argv: any = yargs.argv
    console.log("Passed activity:", argv.activity)

    if (argv.activity == "testing") {
        //usage: yarn debug --source VT1
        await testing(argv.source)
    }
    else {
        warningMessage("Only 'testing' activity is allowed");
    }
}

startActivity()
