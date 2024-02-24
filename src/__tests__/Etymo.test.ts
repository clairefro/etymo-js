import { Etymo } from "../index";

const etymo = new Etymo();

/** ----- Constants ----- */
const VALID_SEARCH_TERM_SINGLE = "remember";
const VALID_SEARCH_TERM_MULTI = "back seat";
const INVALID_SEARCH_TERM = "foooooooooooooo";

const VALID_PATH = "/word/remember#etymonline_v_10402";

const INVALID_LANG = "fooooooooooo";

/** ----- Helpers ----- */
function isEntry(obj: any) {
  return (
    typeof obj === "object" &&
    typeof obj.term === "string" &&
    typeof obj.def === "string" &&
    typeof obj.path === "string" &&
    typeof obj.id === "string"
  );
}

// To prevent spamming etymonline.com
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** ----- Tests -----  */

describe("Etymo.search()", () => {
  test("should return results for a valid single-word search term", async () => {
    const res = (await etymo.search(VALID_SEARCH_TERM_SINGLE)) as Entry[];

    expect(Array.isArray(res)).toBe(true);
    expect(res.every(isEntry)).toBe(true);

    await delay(1500);
  });

  test("should return results for a valid multi-word search term", async () => {
    const res = (await etymo.search(VALID_SEARCH_TERM_MULTI)) as Entry[];

    expect(Array.isArray(res)).toBe(true);
    expect(res.every(isEntry)).toBe(true);

    await delay(1500);
  });

  test("should return an empty array for search term with no results", async () => {
    const res = (await etymo.search(INVALID_SEARCH_TERM)) as Entry[];

    expect(Array.isArray(res)).toBe(true);
    expect(res).toHaveLength(0);

    await delay(1500);
  });
});

describe("Etymo.get()", () => {
  test("should return a single entry for a valid path", async () => {
    const res = await etymo.get(VALID_PATH);

    expect(isEntry(res)).toBe(true);
    expect(res?.path).toEqual(VALID_PATH);

    await delay(1500);
  });

  test("should throw error for an invalid path", async () => {
    try {
      await etymo.get("fooooo");
      fail("Expected function to throw an error but it did not.");
    } catch (error) {
      expect(error).toBeDefined();
    }

    await delay(1500);
  });

  test("should return a single entry for a valid path with valid langauge", async () => {
    const res = await etymo.get(VALID_PATH, { lang: "jp" as Language });

    expect(isEntry(res)).toBe(true);
    // resolved path should inlcude language
    expect(res?.path).toEqual("/jp" + VALID_PATH);
    // 'jp' definition should include Japanese chars
    expect(res?.def).toMatch(/[ぁ-んァ-ン一-龯]/);

    await delay(1500);
  });

  test("should return a single entry for a valid path with valid langauge, even if prepending path with language", async () => {
    const JP_PATH = `/jp${VALID_PATH}`;
    const res = await etymo.get(JP_PATH, { lang: "jp" as Language });

    expect(isEntry(res)).toBe(true);
    // resolved path should inlcude language
    expect(res?.path).toEqual(JP_PATH);
    // 'jp' definition should include Japanese chars
    expect(res?.def).toMatch(/[ぁ-んァ-ン一-龯]/);

    await delay(1500);
  });

  test("should return an entry in the language of the specified lang param, even if provided path is a different langauge", async () => {
    const JP_PATH = `/jp${VALID_PATH}`;
    const LANG = "es";
    const res = await etymo.get(JP_PATH, { lang: LANG as Language });

    expect(isEntry(res)).toBe(true);
    // resolved path should inlcude language
    expect(res?.path).toEqual(JP_PATH.replace(/\/jp/, "/" + LANG));
    // 'jp' definition should not include Japanese chars
    expect(res?.def).not.toMatch(/[ぁ-んァ-ン一-龯]/);

    await delay(1500);
  });

  test("should return English when 'en' is sepcified and language", async () => {
    const res = await etymo.get(VALID_PATH, { lang: "en" as Language });

    expect(isEntry(res)).toBe(true);
    expect(res?.path).toEqual(VALID_PATH);

    await delay(1500);
  });

  test("should throw error for an invalid language", async () => {
    try {
      await etymo.get(VALID_PATH, { lang: INVALID_LANG as Language });
      fail("Expected function to throw an error but it did not.");
    } catch (error) {
      console.log(error);
      expect(error).toBeDefined();
    }

    await delay(1500);
  });
});

describe("Etymo.trending()", function () {
  test("should return an array of strings", async function () {
    const res = await etymo.trending();

    expect(Array.isArray(res)).toBe(true);
    expect(res.every((item) => typeof item === "string")).toBe(true);
  });
});

describe("Etymo._buildSearchUrl()", function () {
  const QUERY_SINGLE = "oneword";
  const QUERY_MULTI = "two words";
  const QUERY_MULTI_ENCODED = encodeURIComponent(QUERY_MULTI);

  test("should create valid queries for single word terms", function () {
    const url = etymo._buildSearchUrl(QUERY_SINGLE);
    expect(url).toEqual(`https://www.etymonline.com/search?q=${QUERY_SINGLE}`);
  });

  test("should create valid queries for multi word terms", function () {
    const url = etymo._buildSearchUrl(QUERY_MULTI);
    expect(url).toEqual(
      `https://www.etymonline.com/search?q=${QUERY_MULTI_ENCODED}`
    );
  });
});

describe("Etymo._buildGetUrl", function () {
  test("should create valid queries for valid paths", function () {
    const url = etymo._buildGetUrl(VALID_PATH);
    expect(url).toEqual(`https://www.etymonline.com${VALID_PATH}`);
  });

  test("should include laguage in path for non-english queries", function () {
    const url = etymo._buildGetUrl(VALID_PATH, { lang: "jp" as Language });
    expect(url).toEqual(`https://www.etymonline.com/jp${VALID_PATH}`);
  });

  test("should include laguage in path for non-english queries even if language prepending path is already passed", function () {
    const url = etymo._buildGetUrl(VALID_PATH, { lang: "jp" as Language });
    expect(url).toEqual(`https://www.etymonline.com/jp${VALID_PATH}`);
  });
});
