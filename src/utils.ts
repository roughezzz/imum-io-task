import fs from "fs";
import { v5 as uuidv5 } from "uuid";
const he = require("he");

function getCountryCode(countryCodes: any, url: string) {
  const baseUrl = url.split("/")[2];
  const countryCodeFromUrl: any = baseUrl.split(".").slice(-1);

  return countryCodes[countryCodeFromUrl];
}

function removeExtraWhitespace(text: string) {
  return text.replace(/\r?\n|\r/g, "").replace(/\s\s+/g, " ");
}

function getBaseUrl(url: string) {
  const urlObject = new URL(url);
  const origin = urlObject.origin;
  return origin;
}

function hasQueryParams(url: string): boolean {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const searchParamsKeys = Array.from(searchParams.keys());
  return searchParamsKeys.length > 0;
}

function decodeHtml(encodedStr: string) {
  let decodedString = he.decode(encodedStr);
  return decodedString;
}

function stringToHash(value: string, useLegacyUnlowercased = false) {
  let namespace = "26167fe1-6463-4c97-b958-255f901cb179";
  let lowercased = value.toLowerCase();
  return uuidv5(useLegacyUnlowercased ? value : lowercased, namespace);
}

function jsonToFile(json: any, filename: string) {
  var string = JSON.stringify(json);
  try {
    fs.writeFileSync(filename, string);
  } catch (error) {
    console.log("error saving json " + error);
  }
}

function jsonFromFile(filename: any) {
  try {
    return JSON.parse(fs.readFileSync(filename, "utf-8"));
  } catch (error) {
    console.log("error reading json " + error);
    return undefined;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function warningMessage(message: string) {
  console.log("\x1b[33m%s\x1b[0m", message);
}

export {
  getCountryCode,
  removeExtraWhitespace,
  getBaseUrl,
  hasQueryParams,
  decodeHtml,
  stringToHash,
  jsonToFile,
  jsonFromFile,
  sleep,
  warningMessage,
};
