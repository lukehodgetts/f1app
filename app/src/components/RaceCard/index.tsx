import Race from "../../types/Race";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import images from "../../utils/circuitImages";

interface Props {
  data: Race;
  onClick: (name: string, year: string) => void;
}

const RaceCard: React.FC<Props> = ({ data, onClick }) => {
  const findImage = (circuitId: string) => {
    let foundImage = Object.values(images).find((value) => {
      return value.circuitId === circuitId;
    });
    return foundImage?.image;
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        maxHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => onClick(data.name, data.year)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={findImage(data.circuit._id)}
          alt={`${data.year} ${data.name}`}
        />
        <Typography>{data.year}</Typography>
      </CardActionArea>
    </Card>
  );
};

export default RaceCard;
