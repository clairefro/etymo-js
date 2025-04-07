import axios, { AxiosResponse } from "axios";

type JsonObject = { [key: string]: any } | any[];

async function getHtml(url: string): Promise<string> {
  return get(url, {
    "Content-Type": "text/html",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  }) as unknown as string;
}

async function getJson(url: string): Promise<JsonObject> {
  return get(url, { "Content-Type": "application/json" }) as JsonObject;
}

async function get(
  url: string,
  headers: { [key: string]: string } = {}
): Promise<string | JsonObject> {
  const response: AxiosResponse<string> = await axios.get(url, { headers });

  return response.data;
}
export { getHtml, getJson };
