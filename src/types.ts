export type Language =
  | "cn"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "jp"
  | "kr"
  | "pt";

export interface EntryWithoutPathId {
  term: string;
  def: string;
}

export interface Entry extends EntryWithoutPathId {
  path: string;
  id: string;
}
