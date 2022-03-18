import CardContainer from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  image: string;
  name: string;
  position?: string;
  fastestLapTime?: string;
}

const PodiumCard: React.FC<Props> = ({
  image,
  name,
  position,
  fastestLapTime,
}) => {
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
          width="100%"
        >
          <Box display="flex" justifyContent="center">
            <Typography variant="h5" color="common.white">
              {name}
            </Typography>
          </Box>
          {position && (
            <Typography variant="h5" ml={1} color="common.white">
              {convertPosition(position)}
            </Typography>
          )}
          {fastestLapTime && (
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography ml={1} variant="h5" color="common.white">
                fastest lap
              </Typography>
              <Typography mr={1} variant="h5" color="common.white">
                {fastestLapTime}
              </Typography>
            </Box>
          )}
        </Stack>
        <CardMedia component="img" image={image} alt={`image of ${name}`} />
      </Box>
    </CardContainer>
  );
};

export default PodiumCard;
