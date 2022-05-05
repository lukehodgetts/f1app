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
import SearchResponse from "../../types/SearchResponse";

interface Props {
  heading: string;
  data: SearchResponse;
  onResultClick: (
    name: string,
    ref: string,
    type: Category,
    _id: string
  ) => void;
  onChange: (input: string) => void;
}

const Header: React.FC<Props> = ({
  heading,
  data,
  onResultClick,
  onChange,
}) => {
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
            onChange={(event, value) =>
              //@ts-ignore
              onResultClick(value.name, value.ref, value.type, value._id)
            }
            onInputChange={(event, value) => onChange(value)}
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
