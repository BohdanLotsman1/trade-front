import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ConfigType = AxiosRequestConfig & {
  fullResponse?: boolean;
};

type ResponseType<T = any> = {
  data: T;
  config: ConfigType;
};

axios.interceptors.response.use(
  ({ config, data }: ResponseType) => data,
  (errors) => {
    if (errors?.response?.status === 401) axios.post("auth/refresh-token");
    if (errors?.response?.status === 404) throw errors;
    if (errors?.response?.data) throw errors.response.data;
    if (errors?.response) throw errors.response;
    if (errors) throw errors;
  }
);

export class BaseApiService {
  API_HOST = process.env.REACT_APP_API_HOST;

  protected get(url: string, data?: object): Promise<AxiosResponse> {
    return axios.get(url, data);
  }

  protected post(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return axios.post(url, data, config);
  }

  protected put(url: string, data?: object): Promise<AxiosResponse> {
    return axios.put(url, data);
  }

  protected delete(url: string, data?: object): Promise<AxiosResponse> {
    return axios.delete(url, { data });
  }

  protected patch(
    url: string,
    data?: object,
    config?: any
  ): Promise<AxiosResponse> {
    return axios.patch(url, data, config);
  }
}
