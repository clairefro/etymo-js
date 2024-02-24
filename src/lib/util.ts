import { LANGUAGES } from "../constants";

function getIdFromPath(path: string): string {
  // TS doesn't believe me than this match wil be un-null...
  // eslint-disable-next-line
  return path.match(/\d+$/)?.[0]!;
}

/** type guard */
function isLanguage(value: any): value is Language {
  return Object.keys(LANGUAGES).includes(value) ? true : false;
}

export { getIdFromPath, isLanguage };
