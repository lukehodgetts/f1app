import { useState } from "react";
import useAxios from "axios-hooks";

import Profession from "../../types/Profession";
import Driver from "../../types/Driver";
import Constructor from "../../types/Constructor";
import SeasonResponse from "../../types/SeasonResponse";
import Race from "../../types/Race";

import Header from "../../components/Header";
import Timeline from "../../components/Timeline";
import SidePanel from "../../components/SidePanel";
import Card from "../../components/Card";

import { Wrapper, Body, MainContent, Races, Footer } from "./index.styles";

const Homepage = () => {
  const [season, setSeason] = useState(2021);
  const [profession, setProfession] = useState<Profession>("constructor");
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
    console.log(direction);
    if (direction === "next") {
      setSeasonPage(seasonPage + 1);
    } else if (direction === "prev" && seasonPage !== 0) {
      setSeasonPage(seasonPage - 1);
    }
  };

  return (
    <Wrapper>
      <Body>
        <Header heading={"f1app"} />
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
        />
        <Races>
          {raceData?.map((race) => {
            return <Card data={race} />;
          })}
        </Races>
      </MainContent>
      <Footer>made by buk</Footer>
    </Wrapper>
  );
};

export default Homepage;
