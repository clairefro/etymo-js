import { getEntriesFromSearch, getEntryWithoutPathId } from "./lib/cheerioOps";
import { getHtml, getJson } from "./lib/getHtml";
import { getIdFromPath, isLanguage } from "./lib/util";
import { BASE_URL } from "./constants";
import { Entry, Language } from "./types";

class Etymo {
  async search(term: string): Promise<Entry[]> {
    const url = this._buildSearchUrl(term);
    const html = await getHtml(url);

    const entries = getEntriesFromSearch(html);

    return entries;
  }

  async get(
    path: string,
    opts: { lang?: Language } = {}
  ): Promise<Entry | void> {
    const { lang } = opts;
    if (!!lang && !isLanguage(lang)) {
      throw new Error(`Language '${lang}' unknown`);
    }
    const trimmedPath = path.replace(/^\/[a-z]{2}\/word\//, "/word/");
    const url = this._buildGetUrl(trimmedPath, { lang });
    const html = await getHtml(url);

    const isNotEnglish = lang && lang !== "en" ? true : false;
    const entryWithoutPathId = getEntryWithoutPathId(html, isNotEnglish);

    const resolvedPath = isNotEnglish ? `/${lang}` + trimmedPath : path;
    const id = getIdFromPath(path);

    const entry = { ...entryWithoutPathId, path: resolvedPath, id };
    return entry;
  }

  async trending(): Promise<string[]> {
    const url = "https://www.etymonline.com/api/etymology/trending";
    const json = (await getJson(url)) as { [key: string]: any };
    return json.data.items;
  }

  _buildSearchUrl(term: string): string {
    const baseUrl = `${BASE_URL}/search`;

    const urlEncodedTerm = encodeURIComponent(term);

    const url = `${baseUrl}?q=${urlEncodedTerm}`;

    return url;
  }

  _buildGetUrl(path: string, opts: { lang?: Language } = {}) {
    const { lang } = opts;

    let baseUrl = BASE_URL;

    if (!!lang && lang !== "en") {
      baseUrl += `/${lang}`;
    }
    const url = baseUrl + path;

    return url;
  }
}

export { Etymo };
