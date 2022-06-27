import { getToken, TOKEN_USER_KEY } from "../../token";

const baseURL = "https://fbs-openplatform.dbc.dk"; // use your own URL here or environment variable

export const fetcher = async <ResponseType>({
  url,
  method,
  headers,
  params,
  data
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  headers?: object;
  params?: unknown;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  type FetchParams =
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined;

  const userToken = getToken(TOKEN_USER_KEY);
  const authHeaders = userToken
    ? ({ Authorization: `Bearer ${userToken}` } as object)
    : {};

  const body = data ? JSON.stringify(data) : null;

  const response = await fetch(
    `${baseURL}${url}${new URLSearchParams(params as FetchParams)}`,
    {
      method,
      headers: {
        ...headers,
        ...authHeaders
      },
      body
    }
  );

  try {
    return (await response.json()) as ResponseType;
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }
  }

  // Do nothing. Some of our responses are intentionally empty and thus
  // cannot be converted to JSON. Fetch API and TypeScript has no clean
  // way for us to identify empty responses, so instead we swallow
  // syntax errors during decoding.
  return null;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;