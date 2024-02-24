declare enum Language {
  cn = "cn",
  de = "de",
  en = "en",
  es = "es",
  fr = "fr",
  it = "it",
  jp = "jp",
  kr = "kr",
  pt = "pt",
}

interface EntryWithoutPathId {
  name: string;
  def: string;
}

declare interface Entry extends EntryWithoutPathId {
  path: string;
  id: string;
}
