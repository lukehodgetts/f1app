import RaceDetails from "../../types/RaceDetails";
import CardContainer from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

import images from "../../utils/circuitImages";

import { Body, Title, Subtitle, Stat } from "./index.styles";

interface Props {
  data: RaceDetails;
  onClick: (raceName: string, raceYear: string) => void;
}

const Card: React.FC<Props> = ({ data, onClick }) => {
  const fastestLapDriver = data.results.find((driver) => driver.rank === 1);
  const findImage = (circuitId: string) => {
    let foundImage = Object.values(images).find((value) => {
      return value.circuitId === circuitId;
    });
    return foundImage?.image;
  };

  return (
    <CardContainer onClick={() => onClick(data.name, data.year)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={findImage(data.circuit._id)}
          alt={findImage(data.circuit.name)}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography>{data.name}</Typography>
          <Typography>{data.circuit.name}</Typography>
          <Typography>
            1st {data.results[0].driver.forename}{" "}
            {data.results[0].driver.surname}
          </Typography>
          <Typography>
            2nd {data.results[1].driver.forename}{" "}
            {data.results[1].driver.surname}
          </Typography>
          <Typography>
            3rd {data.results[2].driver.forename}{" "}
            {data.results[2].driver.surname}
          </Typography>
          <Typography>
            Fastest Lap {fastestLapDriver?.driver.forename}{" "}
            {fastestLapDriver?.driver.surname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardContainer>
  );
};

export default Card;
