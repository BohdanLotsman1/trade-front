import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect } from "react-router";
import { getMe } from "../../../modules/User/store/actions";
import store from "..";

type ConfigType = AxiosRequestConfig & {
  fullResponse?: boolean;
};

type ResponseType<T = any> = {
  data: T;
  config: ConfigType;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  ({ config, data }: ResponseType) => data,
  async (errors) => {
    console.log(errors);

    if (errors?.response?.status === 404) throw errors.response;
    if (errors?.response?.status === 401) {
      try {
        const resp = await api.post("auth/refresh-token");

        if (!resp?.data?.user?.id) {
          redirect("/login");
          throw errors.response;
        }
        store.dispatch(getMe());
      } catch (error) {
        throw errors.response;
      }
    }
    if (errors?.response?.data) throw errors.response.data;
    if (errors?.response?.message) throw errors.response.message;
    if (errors?.response) throw errors.response;
    if (errors) throw errors;
  }
);

export class BaseApiService {
  API_ROUTE: string;

  constructor() {
    this.API_ROUTE = process.env.REACT_APP_API_URL || "";
  }

  protected get(url: string, data?: object): Promise<AxiosResponse> {
    return api.get(url, data);
  }

  protected post(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return api.post(url, data, config);
  }

  protected put(url: string, data?: object): Promise<AxiosResponse> {
    return api.put(url, data);
  }

  protected delete(url: string, data?: object): Promise<AxiosResponse> {
    return api.delete(url, { data });
  }

  protected patch(
    url: string,
    data?: object,
    config?: any
  ): Promise<AxiosResponse> {
    return api.patch(url, data, config);
  }
}
