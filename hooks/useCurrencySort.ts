import { useState, useEffect, useCallback } from "react";
import { Sort } from "../constants";

const useCurrencySort = (currencies: Currency[]) => {
  const [sortBy, setSortBy] = useState<Sort>(Sort.CODE);

  const [sortedCurrencies, setSortedCurrencies] = useState<Currency[]>([]);

  const shuffleCurrencies = useCallback((c: Currency[]) => {
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }, []);

  useEffect(() => {
    let sorted: Currency[];

    if (sortBy === Sort.RANDOM) {
      sorted = shuffleCurrencies([...currencies]);
    } else {
      sorted = [...currencies].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    setSortedCurrencies(sorted);
  }, [currencies, sortBy, shuffleCurrencies]);

  const onSortChange = (newSort: Sort) => {
    // If the user tried to shuffle again, run the shuffle one more time
    if (newSort === Sort.RANDOM && sortBy === Sort.RANDOM) {
      const sorted = shuffleCurrencies([...currencies]);
      setSortedCurrencies(sorted);
    } else {
      setSortBy(newSort);
    }
  };

  return { sortedCurrencies, onSortChange };
};

export default useCurrencySort;
