import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import useCurrencyFilters from "../hooks/useCurrencyFilters";
import useCurrencySort from "../hooks/useCurrencySort";
import Layout from "../components/Layout";
import FiltersPanel from "../components/FiltersPanel";
import ResponsiveGrid from "../components/ResponsiveGrid";
import CurrencyCard from "../components/CurrencyCard";

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
        <h1 className="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          MoonPay Currencies
        </h1>

        {/* FILTERS & SORTING */}
        <FiltersPanel
          onFiltersChange={onFiltersChange}
          onSortChange={onSortChange}
        />

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
