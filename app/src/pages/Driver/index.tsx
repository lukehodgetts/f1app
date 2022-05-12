import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate, useParams } from "react-router";
import useAxios from "axios-hooks";
import useSearch from "../../hooks/useSearch";

import Category from "../../types/Category";
import DriverType from "../../types/Driver";

import Layout from "../../components/Layout";

const Driver = () => {
  let navigate = useNavigate();
  let { ref } = useParams();

  const [{ data, loading, error }, refetch] = useAxios<DriverType>({
    url: `${process.env.REACT_APP_API_URL}/driver`,
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

  console.log(data);

  return (
    <Layout
      heading={`f1app - ${data?.driver.forename} ${data?.driver.surname}`}
      searchData={searchData || []}
      onResultClick={navigateSearch}
      onChange={(input) => setSearchText(input)}
    >
      <h1>Driver</h1>
    </Layout>
  );
};

export default Driver;
