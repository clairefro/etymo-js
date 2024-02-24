import { LANGUAGES } from "../constants";

function getIdFromPath(path: string): string {
  return path.match(/\d+$/)?.[0]! as unknown as string;
}

/** type guard */
function isLanguage(value: any): value is Language {
  return Object.keys(LANGUAGES).includes(value) ? true : false;
}

export { getIdFromPath, isLanguage };
