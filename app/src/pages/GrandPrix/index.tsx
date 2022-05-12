import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate, useParams } from "react-router";
import useAxios from "axios-hooks";
import useSearch from "../../hooks/useSearch";

import Category from "../../types/Category";
import Races from "../../types/Races";

import Layout from "../../components/Layout";
import RaceCard from "../../components/RaceCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const GrandPrix = () => {
  let navigate = useNavigate();
  let { ref } = useParams();

  const [{ data, loading, error }, refetch] = useAxios<Races>({
    url: `${process.env.REACT_APP_API_URL}/race`,
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

  const navigateRace = (name: string, year: string) => {
    navigate(`/race/${name}/${year}`);
  };

  console.log(data);

  return (
    <Layout
      heading={data?.name ? `f1app - ${data.name}` : `f1app`}
      searchData={searchData || []}
      onResultClick={navigateSearch}
      onChange={(input) => setSearchText(input)}
    >
      <Box sx={{ width: "100%", padding: 10 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data &&
            data.races.map((race) => {
              return (
                <Grid item xs={3}>
                  <RaceCard data={race} onClick={navigateRace} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Layout>
  );
};

export default GrandPrix;
