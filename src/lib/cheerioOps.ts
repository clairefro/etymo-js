import * as cheerio from "cheerio";
import { getIdFromPath } from "./util";
import { Entry, EntryWithoutPathId } from "../types";
import { getHtml } from "./getHtml";

const BASE_URL = "https://www.etymonline.com";

async function getEntriesFromSearch(html: string): Promise<Entry[]> {
  const $ = cheerio.load(html);

  // Get all links and convert to array of promises to resolve linked terms
  const entryPromises = $('a[href^="/word/"]')
    .map(async (_i, el) => {
      const $el = $(el);
      const term = $el.find("span").first().text();
      const path = $el.attr("href") as string;

      // Fetch HTML for this term
      const termHtml = await getHtml(BASE_URL + path);
      const $term = cheerio.load(termHtml);

      const def = $term("section > p").text();

      const id = getIdFromPath(path);
      return { term, def, path, id } as Entry;
    })
    .get(); // Convert Cheerio object to array

  // Wait for all promises to resolve
  const entries = await Promise.all(entryPromises);
  console.log({ entries });
  return entries;
}

function getEntryWithoutPathId(
  html: string,
  isNotEnglish = false
): EntryWithoutPathId {
  const $ = cheerio.load(html);
  if (isNotEnglish) {
    const term = $('[class^="prose-lg"] span').first().text();
    const def = $('[class^="prose-lg"] section').text();
    const entryWithoutPathId = { term, def } as unknown as EntryWithoutPathId;
    return entryWithoutPathId;
  } else {
    const entriesNode = $('[class^="word--"]')[0];

    const term = $(entriesNode).find("h1").text();
    const def = $(entriesNode).find('[class^="word__defination--"]').text();
    const entryWithoutPathId = { term, def } as unknown as EntryWithoutPathId;

    return entryWithoutPathId;
  }
}

export { getEntriesFromSearch, getEntryWithoutPathId };
