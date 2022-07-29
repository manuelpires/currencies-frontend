import { useState, useEffect, useCallback } from "react";
import { Sort } from "../constants";

const useCurrencySort = (currencies: Currency[], initialValue = Sort.CODE) => {
  const [sortBy, setSortBy] = useState<Sort>(initialValue);

  const [sortedCurrencies, setSortedCurrencies] = useState<Currency[]>([]);

  const shuffleCurrencies = useCallback((list: Currency[]) => {
    let shuffled = [...list];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, []);

  useEffect(() => {
    let sorted: Currency[];

    if (sortBy === Sort.RANDOM) {
      sorted = shuffleCurrencies(currencies);
    } else {
      sorted = [...currencies].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    setSortedCurrencies(sorted);
  }, [currencies, sortBy, shuffleCurrencies]);

  const onSortChange = (newSort: Sort) => {
    // If the user tries to shuffle repeatedly, run the shuffle every time
    if (newSort === Sort.RANDOM && sortBy === Sort.RANDOM) {
      const sorted = shuffleCurrencies(currencies);
      setSortedCurrencies(sorted);
    } else {
      setSortBy(newSort);
    }
  };

  return { sortedCurrencies, onSortChange };
};

export default useCurrencySort;
