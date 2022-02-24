import Race from "../../types/Race";

import { Container, Title, Subtitle, Stat } from "./index.styles";

interface Props {
  data: Race;
}

const Card: React.FC<Props> = ({ data }) => {
  const fastestLapDriver = data.results.find(
    (driver) => driver.rank === 1
  );

  return (
    <Container>
      <Title>{data.name}</Title>
      <Subtitle>{data.circuit.name}</Subtitle>
      <Stat>
        1st {data.results[0].driver.forename}{" "}
        {data.results[0].driver.surname}
      </Stat>
      <Stat>
        2nd {data.results[1].driver.forename}{" "}
        {data.results[1].driver.surname}
      </Stat>
      <Stat>
        3rd {data.results[2].driver.forename}{" "}
        {data.results[2].driver.surname}
      </Stat>
      <Stat>
        Fastest Lap {fastestLapDriver?.driver.forename}{" "}
        {fastestLapDriver?.driver.surname}
      </Stat>
    </Container>
  );
};

export default Card;
