import {AxiosResponse} from "axios";
import {BaseApiService} from "../../../libs/utils/store/services";
import {RegistrationFormValues} from "../store/types";

export class RegisterService extends BaseApiService {
    static _instance: RegisterService;

    API_ROUTE = process.env.REACT_APP_API_HOST;

    static getInstance(): RegisterService {
        if (!RegisterService._instance) {
            RegisterService._instance = new RegisterService();
        }
        return RegisterService._instance;
    }

    register = (form: RegistrationFormValues): Promise<AxiosResponse> =>
        this.post(`${this.API_ROUTE}/register`, form);
}
