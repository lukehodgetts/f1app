import { useState } from "react";
import useAxios from "axios-hooks";

import Profession from "../../types/Profession";
import Driver from "../../types/Driver";
import Constructor from "../../types/Constructor";
import Season from "../../types/Season";
import Race from "../../types/Race";

import Header from "../../components/Header";
import Timeline from "../../components/Timeline";
import SidePanel from "../../components/SidePanel";
import Card from "../../components/Card";

import { Wrapper } from "./index.styles";

const Homepage = () => {
  const [season, setSeason] = useState(2021);
  const [profession, setProfession] = useState<Profession>("constructor");

  const [
    { data: seasonData, loading: seasonLoading, error: seasonError },
    getSeasonData,
  ] = useAxios<Season[]>(`${process.env.REACT_APP_API_URL}/season`);

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

  if (seasonLoading || professionLoading) return <h1>loading</h1>;
  if (seasonError || professionError) return <h1>error</h1>;

  if (!seasonData || !professionData) return <h1>no data</h1>;

  return (
    <Wrapper>
      <Header>hi</Header>
      <Timeline data={seasonData} />
      <SidePanel data={professionData} />
    </Wrapper>
  );
};

export default Homepage;
