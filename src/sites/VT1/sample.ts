import csvtojson from "csvtojson"
import { VT1Functions } from "./functions"
import { jsonToFile } from "../../utils"

type InputItem = {
    title: string
    url: string
    source_id: string
}

export class VT1Testing {
    sourceFunctions: VT1Functions

    constructor(autoLaunch = true) {
        this.sourceFunctions = new VT1Functions()
        if (autoLaunch) {
            this.startTests()
        }
    }

    async startTests() {
        await this.scrapeItems()
    }

    async scrapeItems() {
        const items: InputItem[] = await csvtojson({ delimiter: ";" }).fromFile("data/items.csv")
        console.log(`Loaded ${items.length} items`)

        const results = []

        // TODO: for each item, fetch the page, parse it with
        // this.sourceFunctions.scrapePharmacyItem and collect the results.
        // Fetching is up to you (be polite to the site).

        jsonToFile(results, "output.json")
        console.log(`Saved ${results.length} results to output.json`)
    }
}
