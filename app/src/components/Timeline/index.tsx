import { Body, Season, PrevButton, NextButton } from "./index.styles";
import SeasonResponse from "../../types/SeasonResponse";

interface Props {
  data: SeasonResponse;
  timelineOffset: number;
  onSeasonClick: (season: number) => void;
  onButtonClick: (direction: "prev" | "next") => void;
}

const Timeline: React.FC<Props> = ({
  data,
  timelineOffset,
  onSeasonClick,
  onButtonClick,
}) => {
  console.log(10*timelineOffset)
  console.log(data.count)
  return (
    <Body>
      {data && timelineOffset !== 0 ? (
        <PrevButton onClick={() => onButtonClick("prev")}>prev</PrevButton>
      ) : (
        <div />
      )}
      {data &&
        data.seasons.map((season) => {
          return (
            <Season onClick={() => onSeasonClick(season.year)} key={season._id}>
              {season.year}
            </Season>
          );
        })}
      {data && 10 *( timelineOffset + 1) < data.count ? (
        <NextButton onClick={() => onButtonClick("next")}>next</NextButton>
      ) : (
        <div />
      )}
    </Body>
  );
};

export default Timeline;
