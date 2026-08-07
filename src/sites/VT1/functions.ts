import { CheerioAPI } from "cheerio"
import { countryCodes } from "../../config/enums"
import { PharmacyInterface } from "../interfaces"
import { getCountryCode, stringToHash } from "../../utils"
import { PharmacyItem } from "../../types/items/pharmacyItem"
import { VT1Testing } from "./sample"

export class VT1Functions implements PharmacyInterface {
    public baseUrl = "https://vet1.lt"
    public headers = {}

    public useHeadless(source: string, jobType: string): boolean {
        return false
    }

    /**
     * Parse a single product page into one or more PharmacyItem records.
     */
    public scrapePharmacyItem($: CheerioAPI, url: string) {
        let item = {} as PharmacyItem<string>

        item.url = url
        item.sourceId = stringToHash(url)
        item.countryCode = getCountryCode(countryCodes, url)

        // TODO: implement parsing (title, manufacturer, price, discount, availability, category, ...)

        return item
    }

    public getNextPageUrl($: CheerioAPI, url?: string): string | undefined {
        // Not needed for this task: items are provided in data/items.csv
        return undefined
    }

    public addItems($: CheerioAPI, idUrls: any, url?: string): void {
        // Not needed for this task: items are provided in data/items.csv
    }

    public isAdModified(currentItem, previousItem): string {
        return ""
    }

    public isAdRemoved($: CheerioAPI): boolean {
        return false
    }

    public testing(autoLaunch = true) {
        return new VT1Testing(autoLaunch)
    }
}
