import { AxiosResponse } from "axios";
import { BaseApiService } from "../../../libs/store/services";
import { Trade } from "../store/types";

export class TradeService extends BaseApiService {
  static _instance: TradeService;

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
