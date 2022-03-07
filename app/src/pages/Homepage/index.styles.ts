import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "maincontent";
  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  display: grid;
  grid-template-areas: "timeline";
`;

export const MainContent = styled.div`
  display: grid;
  grid-area: "maincontent";
  width: 100%;
  grid-template-areas: "sidepanel" "races";
  grid-template-columns: 20% 80%;
`;

export const Races = styled.div`
  display: grid;
  margin: 10px;
  height: 100%;
  grid-template-columns: repeat(4, 24%);
  grid-template-rows: repeat(6, auto);
  grid-gap: 10px;
`;
