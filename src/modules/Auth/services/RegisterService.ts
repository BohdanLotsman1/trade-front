import { AxiosResponse } from "axios";
import { BaseApiService } from "../../../libs/store/services";
import { RegistrationFormValues } from "../store/types";

export class RegisterService extends BaseApiService {
  static _instance: RegisterService;

  static getInstance(): RegisterService {
    if (!RegisterService._instance) {
      RegisterService._instance = new RegisterService();
    }
    return RegisterService._instance;
  }

  register = (form: RegistrationFormValues): Promise<AxiosResponse> =>
    this.post(`${this.API_ROUTE}/register`, form);
}
