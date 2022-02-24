import styled from "styled-components";

export const Body = styled.div`
  width: 100%;
  height: 100%;
  grid-area: "timeline";
  display: grid;
  grid-template-columns: 5% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 5%;
  background-color: #e10600;
  grid-template-areas: "prevbutton" "season" "season" "season" "season" "season" "season" "season" "season" "nextbutton";
`;

export const Season = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e10600;
  font-weight: bold;
  color: white;
  transition: 0.25s;

  :hover {
    background-color: #00000f;
    cursor: pointer;
  }
`;

export const PrevButton = styled.div`
  grid-area: "prevbutton";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e10600;
  color: white;
`;

export const NextButton = styled.div`
  grid-area: "nextbutton";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e10600;
  color: white;
`;
