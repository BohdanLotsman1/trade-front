import React, { useMemo } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  TextField,
} from "@mui/material";
import { CURRENCY_LOCALSTORAGE_KEY } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCurrency } from "../../../../modules/Chart/store/actions";
import { currencySelector } from "../../../../modules/Chart/store/selectors";
import { useListedCurrencies } from "../../../../modules/Chart/hooks/useListedCurrencies";

export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const { loading, listedCurrencies } = useListedCurrencies();
  const options = useMemo(
    () =>
      listedCurrencies.map((currency) => ({
        title: currency.title,
        value: currency.symbol,
      })),
    [listedCurrencies]
  );

  const handleClick = (currency: string) => {
    dispatch(setCurrentCurrency(currency) as any);
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Autocomplete<{ title: string; value: string }>
          sx={{
            backgroundColor: "#676767",
            borderRadius: "5px",
            color: "white",
            "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
              width: "unset",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #292929ff",
            },
            "& .MuiOutlinedInput-root": {
              padding: 0,
            },
          }}
          value={options.find((o) => o.value === currency) || null}
          onChange={(
            _: any,
            newValue: { title: string; value: string } | null
          ) => {
            if (newValue) {
              handleClick(newValue.value);
            }
          }}
          getOptionLabel={(o) => o.title}
          isOptionEqualToValue={(o, v) => o.value === v.value}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField {...params} />
          )}
          options={options}
        />
      )}
    </>
  );
};
