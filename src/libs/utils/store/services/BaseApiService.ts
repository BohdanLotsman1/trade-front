import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { JWT_LOCALSTORAGE_KEY } from "../../constants";

type ConfigType = AxiosRequestConfig & {
  fullResponse?: boolean;
};

type ResponseType<T = any> = {
  data: T;
  config: ConfigType;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => window.Promise.reject(error)
);
axios.interceptors.response.use(
  ({ config, data }: ResponseType) => data,
  (errors) => {
    if (errors?.response?.status === 401)
      localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
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
