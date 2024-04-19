import { LoginResType } from "@/schemaValidations/auth.schema";
import { HttpMethod } from "@/types/auth.type";

type CustomRequestOptions = Omit<RequestInit, "method"> & { baseUrl?: string };
type EntityErrorType = {
  message: string;
  errors: {
    [p: string]: {
      msg: string;
      path: string;
      [k: string]: string;
    };
  };
};
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [p: string]: any;
  };

  constructor(data: { status: number; payload: any }) {
    super("Http Error");
    this.status = data.status;
    this.payload = data.payload;
  }
}

class ClientToken {
  private access_token = "";
  private refresh_token = "";

  getAccessToken() {
    return this.access_token;
  }
  setAccessToken(access_token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set access token on server side");
    }
    this.access_token = access_token;
  }
  getRefreshToken() {
    return this.refresh_token;
  }
  setRefreshToken(refresh_token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set refresh token on server side");
    }
    this.refresh_token = refresh_token;
  }
}

export const clientToken = new ClientToken();

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorType;
  constructor(data: { status: 422; payload: EntityErrorType }) {
    super(data);
    this.status = data.status;
    this.payload = data.payload;
  }
}

const request = async <Response>(method: HttpMethod, url: string, options?: CustomRequestOptions) => {
  const body = options?.body ? (options.body instanceof FormData ? options.body : JSON.stringify(options.body)) : undefined;
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientToken.getAccessToken() ? `Bearer ${clientToken.getAccessToken()}` : "",
        }
      : {
          "Content-Type": "application/json",
          Authorization: clientToken.getAccessToken() ? `Bearer ${clientToken.getAccessToken()}` : "",
        };
  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === 422) {
      throw new EntityError(data as { status: 422; payload: EntityErrorType });
    }
    throw new HttpError(data);
  }

  if (typeof window !== "undefined") {
    if (["/auth/login", "/auth/register"].includes(url)) {
      clientToken.setAccessToken((payload as LoginResType).result.access_token);
      clientToken.setRefreshToken((payload as LoginResType).result.refresh_token);
    } else if (url === "/auth/logout") {
      clientToken.setAccessToken("");
      clientToken.setRefreshToken("");
    }
  }

  return data;
};

const http = {
  get: <Response>(url: string, options?: Omit<CustomRequestOptions, "body">) => request<Response>("GET", url, options),
  post: <Response>(url: string, body: any, options?: Omit<CustomRequestOptions, "body">) => request<Response>("POST", url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: Omit<CustomRequestOptions, "body">) => request<Response>("PUT", url, { ...options, body }),
  delete: <Response>(url: string, options?: Omit<CustomRequestOptions, "body">) => request<Response>("DELETE", url, options),
  patch: <Response>(url: string, body: any, options?: Omit<CustomRequestOptions, "body">) => request<Response>("PATCH", url, { ...options, body }),
};

export default http;
