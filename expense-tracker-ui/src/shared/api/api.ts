import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__
});

interface ErrorServerResponse {
  message: string[] | string
  error?: string
  statusCode: number
};

export interface AxiosRequestInterface<TParams = any> extends AxiosRequestConfig<any> {
  params?: TParams
}

const checkError = (e: AxiosError<ErrorServerResponse> | Error): never => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<ErrorServerResponse>;

    const { response } = error;

    if (response) {
      throw new Error(Array.isArray(response.data.message) ? response.data.message[0] : response.data.message);
    }
  }

  const error = e;
  throw new Error(error.message);
};

export const get = async <TResponse = any, TParams = any>(
  url: string,
  config?: AxiosRequestInterface<TParams>
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await $api.get<TResponse>(url, config);

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data;
};

export const post = async <TResponse = any, TRequest = any, TParams = any>(
  url: string,
  requestBody: TRequest,
  config?: AxiosRequestInterface<TParams>
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await $api.post<TResponse, AxiosResponse<TResponse>, TRequest>(
      url,
      requestBody,
      config
    );

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data;
};

export const put = async <TResponse = any, TRequest = any, TParams = any>(
  url: string,
  requestBody: TRequest,
  config?: AxiosRequestInterface<TParams>
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await $api.put<TResponse, AxiosResponse<TResponse>, TRequest>(
      url,
      requestBody,
      config
    );

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data;
};

export const patch = async <TResponse = any, TRequest = any, TParams = any>(
  url: string,
  requestBody: TRequest,
  config?: AxiosRequestInterface<TParams>
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await $api.patch<TResponse, AxiosResponse<TResponse>, TRequest>(
      url,
      requestBody,
      config
    );

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data;
};

export const deleteReq = async <TResponse = any, TParams = any>(
  url: string,
  config?: AxiosRequestInterface<TParams>
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await $api.delete<TResponse>(url, config);

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data;
};

$api.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, async error => {
  return checkError(error);
});
