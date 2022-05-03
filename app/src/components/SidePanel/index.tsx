import Constructor from "../../types/Constructor";
import Driver from "../../types/Driver";
import Profession from "../../types/Profession";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  Container,
  ButtonContainer,
  Header,
  Body,
  Entry,
} from "./index.styles";

interface Props {
  data: Constructor | Driver;
  onClick: (type: "driver" | "constructor") => void;
  professionSelected: Profession;
}

const SidePanel: React.FC<Props> = ({ data, onClick, professionSelected }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button
          variant={professionSelected === "driver" ? "contained" : "outlined"}
          onClick={() => onClick("driver")}
        >
          drivers
        </Button>
        <Button
          variant={
            professionSelected === "constructor" ? "contained" : "outlined"
          }
          onClick={() => onClick("constructor")}
        >
          constructors
        </Button>
      </ButtonContainer>
      {data && data.type === "Driver" && (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>pos</TableCell>
                <TableCell align="center">driver</TableCell>
                <TableCell align="right">points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.type === "Driver" &&
                data.DriverStandings.map((driver) => (
                  <TableRow key={driver.Driver.driverId}>
                    <TableCell component="th" scope="row">
                      {driver.position}
                    </TableCell>
                    <TableCell align="center">
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </TableCell>
                    <TableCell align="right">{driver.points}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {data && data.type === "Constructor" && (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>pos</TableCell>
                <TableCell align="center">constructor</TableCell>
                <TableCell align="right">points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.type === "Constructor" &&
                data.ConstructorStandings &&
                data.ConstructorStandings.map((constructor) => (
                  <TableRow key={constructor.Constructor.constructorId}>
                    <TableCell component="th" scope="row">
                      {constructor.position}
                    </TableCell>
                    <TableCell align="center">
                      {constructor.Constructor.name}
                    </TableCell>
                    <TableCell align="right">{constructor.points}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SidePanel;
