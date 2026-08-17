import { CheerioAPI } from "cheerio";
import { IdUrlsType } from "../types/common";
import { PharmacyItem } from "../types/items/pharmacyItem";

export interface CommonInterface {
    // required properties
    headers: any;
    useHeadless(source: string, jobType: string, url?: string): boolean

    // optional properties
    isXmlMode?: boolean;
    cookies?: any;

    // required methods
    getNextPageUrl($: CheerioAPI, url?: string): string | undefined;
    addItems($: CheerioAPI, idUrls: IdUrlsType, url?: string, adLinkMeta?: any): void;
    /**
     *
     * @param {object} currentItem currently scraped item
     * @param {object} previousItem fetched from database previous item
     */
    isAdModified(currentItem:PharmacyItem, previousItem:PharmacyItem): string;
    isAdRemoved($: CheerioAPI): boolean;
    testing(autoLaunch?: boolean): void
}

export interface PharmacyInterface extends CommonInterface {
    scrapePharmacyItem($: CheerioAPI, url: string, adLinkMeta?: any): any;
}
