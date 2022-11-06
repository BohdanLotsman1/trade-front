import {AxiosResponse} from "axios";
import {BaseApiService} from "../../../libs/utils/store/services";

export class ChartService extends BaseApiService {
    static _instance: ChartService;

    API_ROUTE = process.env.REACT_APP_API_HOST;

    static getInstance(): ChartService {
        if (!ChartService._instance) {
            ChartService._instance = new ChartService();
        }
        return ChartService._instance;
    }

    getChartHistory = (currency: string): Promise<AxiosResponse> =>{
        return this.get(`${this.API_ROUTE}/history?currency=${currency}`);
    }
}
