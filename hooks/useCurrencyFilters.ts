import { useState, useEffect } from "react";
import { Filter } from "../constants";

const useCurrencyFilters = (currencies: Currency[]) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    // Get only currencies that match the current filters
    const filtered = currencies.filter((currency) =>
      filters.every((f) => currency[f])
    );

    setFilteredCurrencies(filtered);
  }, [currencies, filters]);

  const onFiltersChange = (filter: Filter, checked: boolean) => {
    if (checked) {
      setFilters([...filters, filter]);
    } else {
      setFilters(filters.filter((f) => f !== filter));
    }
  };

  return { filteredCurrencies, onFiltersChange };
};

export default useCurrencyFilters;
