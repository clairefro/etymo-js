import axios, { AxiosResponse } from "axios";

type JsonObject = { [key: string]: any } | any[];

async function getHtml(url: string): Promise<string> {
  return get(url, { "Content-Type": "text/html" }) as unknown as string;
}

async function getJson(url: string): Promise<JsonObject> {
  return get(url, { "Content-Type": "application/json" }) as JsonObject;
}

async function get(
  url: string,
  headers: { [key: string]: string } = {}
): Promise<string | JsonObject> {
  try {
    const response: AxiosResponse<string> = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export { getHtml, getJson };
