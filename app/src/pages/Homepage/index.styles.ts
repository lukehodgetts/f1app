import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "body"
    "maincontent"
    "footer";
  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  display: grid;
  grid-area: "body";
  grid-template-areas:
    "header"
    "timeline";
`;

export const MainContent = styled.div`
  display: grid;
  grid-area: "maincontent";
  width: 100%;
  grid-template-areas: "sidepanel" "races";
  grid-template-columns: 25% 75%;
`;

export const Races = styled.div`
  display: grid;
  margin: 10px;
  height: 100%;
  grid-template-columns: repeat(4, 24%);
  grid-template-rows: repeat(5, 15%);
  grid-gap: 5px;
`;

export const Footer = styled.div`
  grid-area: "footer";
  background-color: #e10600;
  bottom: 0;
  width: 100%;
  height: 30px;
  direction: rtl;
  text-indent: 1%;
  font-size: 1vw;
  font-weight: bold;
  color: white;
`;
