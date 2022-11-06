import { AxiosResponse } from 'axios';
import {BaseApiService} from '../../../libs/utils/store/services';
import { JWT_LOCALSTORAGE_KEY } from '../../../libs/utils/constants';
import {parseJWT, setToHappen} from "../../../libs/utils/helpers";
import { User } from '../../User/store/types';

export class AuthService extends BaseApiService{
    static _instance: AuthService;

    TOKEN_KEY = JWT_LOCALSTORAGE_KEY;
    API_ROUTE = process.env.REACT_APP_API_HOST;
    APP_URL = process.env.REACT_APP_URL;

    user?: User | null;
    userPromise: Promise<User | null>;
    private resolve?: (user: User | null) => void;
    updateTimeout: number | null = null;

    constructor() {
        super();
        if (AuthService._instance) {
            throw Error('Cannot create new instance');
        }
        this.userPromise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }

    static getInstance(): AuthService {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    static getAuthState(): boolean {
        return !!localStorage.getItem(JWT_LOCALSTORAGE_KEY);
    }

    setUser(user: User | null): void {
        this.user = user;
        this.resolve && this.resolve(user);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    applyToken(jwt: string, silent = false): void {
        localStorage.setItem(this.TOKEN_KEY, jwt);

        if (!silent) {
            const [, payload] = parseJWT(jwt);
            const expiredDate = payload.exp - 300;

            if (this.updateTimeout !== null) {
                window.clearTimeout(this.updateTimeout);
            }

            this.updateTimeout = setToHappen(async () => {}, expiredDate * 1000);
        }
    }



    login = (data: object): Promise<AxiosResponse> => {
        return this.post(`${this.API_ROUTE}/auth/login`, data);     
    };

    getLogout = (): Promise<AxiosResponse> => {
       return this.get(`${this.API_ROUTE}/auth/logout`);
    };
}
