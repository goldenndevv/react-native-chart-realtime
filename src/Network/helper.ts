import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import axios from 'axios';
import { createRef } from 'react';

export interface ParamsNetwork extends AxiosRequestConfig {
  url: string;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  body?: Record<string, unknown>;
}
export const controller = createRef<AbortController>();
//@ts-ignore
// init controller
controller.current = new AbortController();

export const cancelAllRequest = () => {
  controller.current?.abort();

  // reset controller, if not. all request cannot execute
  // because old controller was aborted
  // @ts-ignore
  controller.current = new AbortController();
};
export const handlePath = (url: string, path: ParamsNetwork['path']) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }

  let resUrl = url;
  Object.keys(path).forEach((k) => {
    resUrl = resUrl.replaceAll(`{${k}}`, String(path[k]));

    resUrl = resUrl.replaceAll(`:${k}`, String(path[k]));
  });

  return resUrl;
};
export interface MessageRes {
  success: boolean;
  error?: any;
}
export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method
): ParamsNetwork => {
  const { url, body, path, params } = props;

  return {
    ...props,
    method,
    url: handlePath(url, path),
    data: body,
    params,
  };
};
export const successResponse = (data: any) => {
  return { data: data, success: true };
};
export const errorResponse = <T extends MessageRes>(data: T) => {
  return { data: data, success: false };
};
export interface ResResults<T> {
  message?: string;
  success: boolean;
  data: T;
}

export class Api {
  baseUrl: string;
  axios: AxiosInstance;
  constructor(url: string, token: string) {
    this.baseUrl = url;
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (token) {
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }
  public async request<T>(config: AxiosRequestConfig): Promise<ResResults<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.request(config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      if (error?.response) {
        return {
          success: false,
          data: error.response.data,
        };
      }
      throw error;
    }
  }
}
