import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import { useDebounce } from "use-debounce";
import useSearch from "../../hooks/useSearch";

import Profession from "../../types/Profession";
import DriverStandings from "../../types/DriverStandings";
import ConstructorStandings from "../../types/ConstructorStandings";
import SeasonResponse from "../../types/SeasonResponse";
import RaceDetails from "../../types/RaceDetails";
import Category from "../../types/Category";
import SearchResponse from "../../types/SearchResponse";

import Layout from "../../components/Layout";
import Timeline from "../../components/Timeline";
import SidePanel from "../../components/SidePanel";
import Card from "../../components/Card";

import { Wrapper, Body, MainContent, Races } from "./index.styles";

const Homepage = () => {
  let navigate = useNavigate();

  const [season, setSeason] = useState(2021);
  const [profession, setProfession] = useState<Profession>("driver");
  const [races, setRaces] = useState([]);

  const [seasonPage, setSeasonPage] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 300);

  const [
    { data: seasonData, loading: seasonLoading, error: seasonError },
    getSeasonData,
  ] = useAxios<SeasonResponse>({
    url: `${process.env.REACT_APP_API_URL}/season`,
    params: {
      page: seasonPage,
    },
  });

  const [
    {
      data: professionData,
      loading: professionLoading,
      error: professionError,
    },
    getProfessionData,
  ] = useAxios<DriverStandings | ConstructorStandings>({
    url: `${process.env.REACT_APP_API_URL}/${season}/${profession}`,
  });

  const [
    { data: raceData, loading: raceLoading, error: raceError },
    getRaceData,
  ] = useAxios<RaceDetails[]>(`${process.env.REACT_APP_API_URL}/${season}/race`);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: getSearchData,
  } = useSearch(searchText);

  useEffect(() => {
    if (debouncedSearchText.length > 0) getSearchData();
  }, [debouncedSearchText]);

  const validatePage = (direction: string) => {
    if (direction === "next") {
      setSeasonPage(seasonPage + 1);
    } else if (direction === "prev" && seasonPage !== 0) {
      setSeasonPage(seasonPage - 1);
    }
  };

  const navigateRace = (name: string, year: string) => {
    navigate(`/race/${name}/${year}`);
  };

  const navigateSearch = (
    name: string,
    ref: string,
    type: Category,
    _id: string
  ) => {
    navigate(`/${type}/${ref}`);
  };

  console.log(debouncedSearchText);

  return (
    <Layout
      heading="f1app"
      searchData={searchData || []}
      onResultClick={navigateSearch}
      onChange={(input) => setSearchText(input)}
    >
      <Wrapper>
        {(seasonData && professionData && raceData && (
          <>
            <Body>
              <Timeline
                data={seasonData}
                timelineOffset={seasonPage}
                onSeasonClick={(season) => {
                  setSeason(season);
                }}
                onButtonClick={(direction) => {
                  validatePage(direction);
                }}
              />
            </Body>
            <MainContent>
              <SidePanel
                data={professionData}
                onClick={(type) => {
                  setProfession(type);
                }}
                professionSelected={profession}
              />
              <Races>
                {raceData?.map((race) => {
                  return <Card data={race} onClick={navigateRace} />;
                })}
              </Races>
            </MainContent>
          </>
        )) || <h1>no data</h1>}
      </Wrapper>
    </Layout>
  );
};

export default Homepage;
