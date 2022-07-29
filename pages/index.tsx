import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Filter, Sort } from "../constants";
import Layout from "../components/Layout";
import Toggle from "../components/Toggle";
import Button from "../components/Button";
import ResponsiveGrid from "../components/ResponsiveGrid";
import CurrencyCard from "../components/CurrencyCard";
import useCurrencyFilters from "../hooks/useCurrencyFilters";
import useCurrencySort from "../hooks/useCurrencySort";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  currencies,
}) => {
  const { sortedCurrencies, onSortChange } = useCurrencySort(currencies);

  const { filteredCurrencies, onFiltersChange } =
    useCurrencyFilters(sortedCurrencies);

  return (
    <Layout
      title="MoonPay Currencies"
      description="Find out about all currencies listed on MoonPay"
    >
      <main className="flex flex-col gap-16 items-center py-16">
        {/* HEADING */}
        <h1 className="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          MoonPay Currencies
        </h1>

        {/* FILTERS & SORTING */}
        <div className="flex flex-col items-center gap-8">
          <Toggle
            label="Hide not supported in the US"
            onChange={(checked) =>
              onFiltersChange(Filter.HIDE_NOT_SUPPORTED_IN_US, checked)
            }
          />

          <Toggle
            label="Hide not available in Test Mode"
            onChange={(checked) =>
              onFiltersChange(Filter.HIDE_NOT_SUPPORTED_TEST_MODE, checked)
            }
          />

          <div
            className="inline-flex content-center gap-3 items-center rounded-md shadow-sm"
            role="group"
          >
            <span className="text-md text-slate-300">Sort:</span>

            <Button onClick={() => onSortChange(Sort.CODE)}>Symbol</Button>
            <Button onClick={() => onSortChange(Sort.NAME)}>Name</Button>
            <Button onClick={() => onSortChange(Sort.RANDOM)}>Random</Button>
          </div>
        </div>

        {/* CURRENCIES LIST */}
        <ResponsiveGrid>
          {filteredCurrencies.map((currency) => (
            <CurrencyCard key={currency.id} {...currency} />
          ))}
        </ResponsiveGrid>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  currencies: Currency[];
}> = async (ctx) => {
  const res = await fetch("https://api.moonpay.com/v3/currencies");
  const currencies = (await res.json()) as Currency[];

  if (!currencies) {
    return {
      notFound: true,
    };
  }

  return { props: { currencies } };
};

export default Home;
