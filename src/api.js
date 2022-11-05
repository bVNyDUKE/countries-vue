import { useQuery } from "@tanstack/vue-query";

async function fetcher(endpoint) {
  const res = await fetch("https://restcountries.com/v3.1" + endpoint);
  if (!res.ok) {
    throw new Error("Network error");
  }
  return await res.json();
}

async function fetchParsedCountry(code, allCountries) {
  let res = await fetcher("/alpha/" + code);
  const country = res[0];

  const nativeName = Object.values(country.name.nativeName)[0].official;
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "";

  const currencies = country.currencies
    ? Object.values(country.currencies)
      .reduce((prev, next) => [...prev, next.name], [])
      .join(", ")
    : "...";

  const borders =
    country.borders?.map((border) => {
      const borderCountry = allCountries.value.find((c) => c.cca3 === border);
      return { name: borderCountry.name.common, code: borderCountry.cca3 };
    }) || [];

  return {
    ...country,
    name: country.name.official,
    nativeName,
    flag: country.flags.svg,
    capital: country.capital ? country.capital.join(" ") : "None",
    domain: country.tld ? country.tld.join(", ") : "",
    languages,
    currencies,
    borders,
  };
}

export const getAllCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => fetcher("/all"),
    refetchInterval: 86000,
    refetchOnWindowFocus: false,
  });

export const getCountryByCode = (code) => {
  const { data: allCountries } = getAllCountries();

  return useQuery({
    queryKey: ["country/" + code],
    queryFn: async () => fetchParsedCountry(code, allCountries),
    refetchOnWindowFocus: false,
    enabled: !!code && !!allCountries.value,
  });
};
