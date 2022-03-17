import CardContainer from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  image: string;
  name: string;
  position: string;
}

const PodiumCard: React.FC<Props> = ({ image, name, position }) => {
  const convertPosition = (position: string) => {
    switch (position) {
      case "1":
        return "1st";
      case "2":
        return "2nd";
      case "3":
        return "3rd";
    }
  };

  return (
    <CardContainer>
      <Box position="relative">
        <Stack
          position="absolute"
          direction="column"
          justifyContent="space-between"
          height="100%"
        >
          <Typography>{name}</Typography>
          <Typography>{convertPosition(position)}</Typography>
        </Stack>
        <CardMedia component="img" image={image} alt={`image of ${name}`} />
      </Box>
    </CardContainer>
  );
};

export default PodiumCard;
