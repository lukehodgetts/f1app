import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate, useLocation } from "react-router";
import useAxios from "axios-hooks";
import useSearch from "../../hooks/useSearch";

import Category from "../../types/Category";

import Layout from "../../components/Layout";

const Driver = () => {
  let navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 300);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: getSearchData,
  } = useSearch(searchText);

  useEffect(() => {
    if (debouncedSearchText.length > 0) getSearchData();
  }, [debouncedSearchText]);

  const navigateSearch = (name: string, ref: string, type: Category) => {
    navigate(`/${type}/${ref}`);
  };

  return (
    <Layout
      heading="f1app"
      searchData={searchData || []}
      onResultClick={navigateSearch}
      onChange={(input) => setSearchText(input)}
    >
      <h1>Driver</h1>
    </Layout>
  );
};

export default Driver;
