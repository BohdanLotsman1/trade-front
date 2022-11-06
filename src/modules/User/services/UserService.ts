import {AxiosResponse} from "axios";
import {BaseApiService} from "../../../libs/utils/store/services";

export class UserService extends BaseApiService {
    static _instance: UserService;

    API_ROUTE = process.env.REACT_APP_API_HOST;

    static getInstance(): UserService {
        if (!UserService._instance) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }

    getAuthUserByToken = (): Promise<AxiosResponse> =>{
        return this.get(`${this.API_ROUTE}/auth`);
    }
    
    deleteUser = (id: string): Promise<AxiosResponse> => {
        return this.delete(`${this.API_ROUTE}/user/${id}`);
    }

    updateUserInfo = (data: any, id: string): Promise<AxiosResponse> =>{
        return this.patch(`${this.API_ROUTE}/user/${id}`,data);
    }

    updUserPassword = (id: string, data: any): Promise<AxiosResponse> =>{
        return this.patch(`${this.API_ROUTE}/auth/password/${id}`,data);
    }

    getWallet = (id: string): Promise<AxiosResponse> =>{
        return this.get(`${this.API_ROUTE}/wallet/${id}`);
    }

    refillWallet = (id: string): Promise<AxiosResponse> =>{
        return this.put(`${this.API_ROUTE}/wallet/${id}`);
    }
}
