import { Body, Season } from "./index.styles";
import season from "../../types/Season";

interface Props {
  data: season;
}

const Timeline: React.FC<Props> = ({ data }) => {
  const sortedSeasons = [...data?.MRData.SeasonTable.Seasons || []].reverse();
  return (
    <Body>
      {sortedSeasons &&
        sortedSeasons.map((season) => {
          return <Season key={season.season}>{season.season}</Season>;
        })}
    </Body>
  );
};

export default Timeline;
