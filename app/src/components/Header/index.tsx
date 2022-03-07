import { AppBar, Toolbar, Typography } from "@mui/material";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
