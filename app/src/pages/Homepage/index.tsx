import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";

import Profession from "../../types/Profession";
import Driver from "../../types/Driver";
import Constructor from "../../types/Constructor";
import SeasonResponse from "../../types/SeasonResponse";
import Race from "../../types/Race";

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
  ] = useAxios<Driver | Constructor>({
    url: `${process.env.REACT_APP_API_URL}/${season}/${profession}`,
  });

  const [
    { data: raceData, loading: raceLoading, error: raceError },
    getRaceData,
  ] = useAxios<Race[]>(`${process.env.REACT_APP_API_URL}/${season}/race`);
  // if (seasonLoading || professionLoading) return <h1>loading</h1>;
  // if (seasonError || professionError) return <h1>error</h1>;

  if (!seasonData || !professionData) return <h1>no data</h1>;

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

  return (
    <Layout heading="f1app">
      <Wrapper>
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
      </Wrapper>
    </Layout>
  );
};

export default Homepage;
