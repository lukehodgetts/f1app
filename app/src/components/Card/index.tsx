import Race from "../../types/Race";

import { Container, Title, Subtitle, Stat } from "./index.styles";

interface Props {
  data: Race;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <Title>{data.MRData.RaceTable.Races[0].raceName}</Title>
      <Subtitle>{data.MRData.RaceTable.Races[0].Circuit.circuitName}</Subtitle>
      <Stat>
        {data.MRData.RaceTable.Races[0].Results[0].Driver.givenName}{" "}
        {data.MRData.RaceTable.Races[0].Results[0].Driver.familyName}
      </Stat>
      <Stat>
        {data.MRData.RaceTable.Races[0].Results[0].Driver.givenName}{" "}
        {data.MRData.RaceTable.Races[0].Results[0].Driver.familyName}
      </Stat>
      <Stat>
        {data.MRData.RaceTable.Races[0].Results[0].Driver.givenName}{" "}
        {data.MRData.RaceTable.Races[0].Results[0].Driver.familyName}
      </Stat>
      <Stat>
        {data.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time}
      </Stat>
    </Container>
  );
};

export default Card;
