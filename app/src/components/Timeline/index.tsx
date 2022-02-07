import { Body, Season } from "./index.styles";
import season from "../../types/Season";

interface Props {
  data: season[];
}

const Timeline: React.FC<Props> = ({ data }) => {
  return (
    <Body>
      {data &&
        data.map((season) => {
          return <Season key={season._id}>{season.year}</Season>;
        })}
    </Body>
  );
};

export default Timeline;
