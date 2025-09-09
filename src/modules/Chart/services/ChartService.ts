import { AxiosResponse } from "axios";
import { BaseApiService } from "../../../libs/store/services";
import { GetHistoryParams } from "../store/types";

export class ChartService extends BaseApiService {
  static _instance: ChartService;

  static getInstance(): ChartService {
    if (!ChartService._instance) {
      ChartService._instance = new ChartService();
    }
    return ChartService._instance;
  }

  getChartHistory = ({
    currency,
    interval,
    endTime,
  }: GetHistoryParams): Promise<AxiosResponse> => {
    return this.get(
      `${this.API_ROUTE}/history?currency=${currency}${
        interval ? `&interval=${interval}` : ""
      }${endTime ? `&endTime=${endTime}` : ""}`
    );
  };
}
