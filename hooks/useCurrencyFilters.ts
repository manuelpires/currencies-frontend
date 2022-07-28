import { useState, useEffect } from "react";
import { Filter } from "../constants";

const useCurrencyFilters = (currencies: Currency[]) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);

  const onFiltersChange = (filter: Filter, checked: boolean) => {
    if (checked) {
      setFilters([...filters, filter]);
    } else {
      setFilters(filters.filter((f) => f !== filter));
    }
  };

  useEffect(() => {
    const filtered = currencies.filter(
      (currency) => !filters.some((filter) => !currency[filter])
    );

    setFilteredCurrencies(filtered);
  }, [currencies, filters]);

  return { filteredCurrencies, onFiltersChange };
};

export default useCurrencyFilters;
