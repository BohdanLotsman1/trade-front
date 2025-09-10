import { useEffect, useState } from "react";
import { LISTED_CURRENCIES_LOCALSTORAGE_KEY } from "../../../libs/utils/constants";
import { ListedCurrenciesStorage } from "../store/types";
import { ChartService } from "../services";

const chartService = ChartService.getInstance();

export const useListedCurrencies = () => {
  const [listedCurrencies, setListedCurrencies] = useState<
    { symbol: string; title: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchListedCurrencies = async () => {
      setLoading(true);
      try {
        const response = await chartService.getListedCurrencies();
        const { data } = response;

        setListedCurrencies(data.currencies);

        localStorage.setItem(
          LISTED_CURRENCIES_LOCALSTORAGE_KEY,
          JSON.stringify({
            expireTime: Date.now() + 1000 * 60 * 60 * 24,
            currencies: data.currencies,
          })
        );
      } catch (error) {
        console.error("Failed to fetch listed currencies:", error);
      } finally {
        setLoading(false);
      }
    };
    const cachedCurrencies: ListedCurrenciesStorage = JSON.parse(
      localStorage.getItem(LISTED_CURRENCIES_LOCALSTORAGE_KEY) || "{}"
    );

    if (cachedCurrencies && cachedCurrencies.expireTime > Date.now()) {
      setListedCurrencies(cachedCurrencies.currencies);
    } else {
      fetchListedCurrencies();
    }
  }, []);

  return {
    listedCurrencies,
    loading,
  };
};
