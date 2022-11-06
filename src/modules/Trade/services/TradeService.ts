import { AxiosResponse } from "axios";
import { BaseApiService } from "../../../libs/utils/store/services";
import { Trade } from "../store/types";

export class TradeService extends BaseApiService {
  static _instance: TradeService;

  API_ROUTE = process.env.REACT_APP_API_HOST;

  static getInstance(): TradeService {
    if (!TradeService._instance) {
      TradeService._instance = new TradeService();
    }
    return TradeService._instance;
  }

  createTrade = (trade: Trade): Promise<AxiosResponse> => {
    return this.post(`${this.API_ROUTE}/trade`, trade);
  };

  getTrades = (id: string): Promise<AxiosResponse> => {
    return this.get(`${this.API_ROUTE}/trade/user/${id}`);
  };

  closeTrade = (id: string): Promise<AxiosResponse> => {
    return this.get(`${this.API_ROUTE}/trade/close/${id}`);
  };
}
