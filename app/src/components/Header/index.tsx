import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Container,
} from "@mui/material";
import { color } from "@mui/system";

import Category from "../../types/Category";

interface Props {
  heading: string;
  data: { name: string; type: Category }[];
  onResultClick: (name: string, type: Category) => void;
}

const Header: React.FC<Props> = ({ heading, data, onResultClick }) => {
  console.log(data);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div">
          {heading}
        </Typography>
        <Container sx={{ flexGrow: 1 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            sx={{ padding: "0 250px" }}
            renderInput={(params) => <TextField {...params} label="Search" />}
            getOptionLabel={(params) => params.name}
            //@ts-ignore
            onChange={(event, value) => onResultClick(value.name, value.type)}
          />
        </Container>
        <Button color="inherit" size="large" href="/">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
