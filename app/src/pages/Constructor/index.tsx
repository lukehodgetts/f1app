import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate, useParams } from "react-router";
import useSearch from "../../hooks/useSearch";

import Category from "../../types/Category";
import ConstructorType from "../../types/ConstructorStandings";

import Layout from "../../components/Layout";
import useAxios from "axios-hooks";

const Constructor = () => {
  let navigate = useNavigate();
  let { ref } = useParams();

  const [{ data, loading, error }, refetch] = useAxios<ConstructorType>({
    url: `${process.env.REACT_APP_API_URL}/constructor`,
    params: {
      ref: ref,
    },
  });

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
      <h1>Constructor</h1>
    </Layout>
  );
};

export default Constructor;
