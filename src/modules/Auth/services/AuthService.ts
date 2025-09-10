import { AxiosResponse } from "axios";
import { BaseApiService } from "../../../libs/store/services";
import { User } from "../../User/store/types";

export class AuthService extends BaseApiService {
  static _instance: AuthService;

  user?: User | null;
  userPromise: Promise<User | null>;
  private resolve?: (user: User | null) => void;
  updateTimeout: number | null = null;

  constructor() {
    super();
    if (AuthService._instance) {
      throw Error("Cannot create new instance");
    }
    this.userPromise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

  setUser(user: User | null): void {
    this.user = user;
    this.resolve && this.resolve(user);
  }

  login = (data: object): Promise<AxiosResponse> => {
    return this.post(`${this.API_ROUTE}/auth/login`, data);
  };

  logout = (): Promise<AxiosResponse> => {
    return this.get(`${this.API_ROUTE}/auth/logout`);
  };

  refreshToken = (): Promise<AxiosResponse> => {
    return this.post(`${this.API_ROUTE}/auth/refresh-token`);
  };
}
