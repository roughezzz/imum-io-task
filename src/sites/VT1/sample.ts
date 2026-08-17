import csvtojson from "csvtojson";
import { VT1Functions } from "./functions";
import { jsonToFile } from "../../utils";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

type InputItem = {
  title: string;
  url: string;
  source_id: string;
};

export class VT1Testing {
  sourceFunctions: VT1Functions;

  constructor(autoLaunch = true) {
    this.sourceFunctions = new VT1Functions();
    if (autoLaunch) {
      this.startTests();
    }
  }

  async startTests() {
    await this.scrapeItems();
  }

  async scrapeItems() {
    const items: InputItem[] = await csvtojson({ delimiter: ";" }).fromFile(
      "data/items.csv",
    );
    console.log(`Loaded ${items.length} items`);

    console.log(`Scraping items from ${this.sourceFunctions.baseUrl}...`);

    const results: any = [];

    await Promise.all(
      items.map(async (item) => {
        const url = item.url;
        const sourceId = item.source_id;

        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const parsedItem = this.sourceFunctions.scrapePharmacyItem($, url);
        results.push({ ...parsedItem, title: item.title });
      }),
    );

    await jsonToFile(results, "output.json");
    console.log(`Saved ${results.length} results to output.json`);
  }
}
