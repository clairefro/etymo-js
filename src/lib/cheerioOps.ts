import * as cheerio from "cheerio";
import { getIdFromPath } from "./util";

function getEntriesFromSearch(html: string): Entry[] {
  const $ = cheerio.load(html);
  const entries: any[] = [];

  const entriesNodes = $('[class^="word--"]');

  entriesNodes.each((_i, el) => {
    const term = $(el).find('[class^="word__name--"]').text();
    const def = $(el).find('[class^="word__defination--"]').text();

    const path = el.attribs.href;

    const id = getIdFromPath(path);
    const entry = { term, def, path, id } as unknown as Entry;
    entries.push(entry);
  });

  return entries;
}

function getEntryWithoutPathId(
  html: string,
  isNotEnglish = false
): EntryWithoutPathId {
  const $ = cheerio.load(html);
  if (isNotEnglish) {
    const term = $('[class^="prose-lg"] span').text();
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
