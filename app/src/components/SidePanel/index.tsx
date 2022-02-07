import Constructor from "../../types/Constructor";
import Driver from "../../types/Driver";

import {
  Container,
  ButtonContainer,
  Button,
  Header,
  Body,
  Entry,
} from "./index.styles";

interface Props {
  data: Constructor | Driver;
}

const SidePanel: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button>drivers</Button>
        <Button>constructors</Button>
      </ButtonContainer>
      <Header>
        {data && data.type === "Driver"
          ? "Drivers Table"
          : "Constructors Table"}
      </Header>
      <Body>
        {(data &&
          data.type === "Driver" &&
          data.DriverStandings.map((driver) => (
            <Entry key={driver.Driver.driverId}>
              {driver.position} {driver.Driver.givenName}{" "}
              {driver.Driver.familyName} {driver.points}
            </Entry>
          ))) ||
          (data &&
            data.type === "Constructor" &&
            data.ConstructorStandings.map((constructor) => (
              <Entry>
                {constructor.position} {constructor.Constructor.name}{" "}
                {constructor.points}
              </Entry>
            )))}
      </Body>
    </Container>
  );
};

export default SidePanel;
