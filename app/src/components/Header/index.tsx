import { Body, Title } from "./index.styles";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <Body>
      <Title>{heading}</Title>
    </Body>
  );
};

export default Header;
