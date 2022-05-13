import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate, useParams } from "react-router";
import useAxios from "axios-hooks";
import useSearch from "../../hooks/useSearch";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Category from "../../types/Category";
import DriverType from "../../types/Driver";

import Layout from "../../components/Layout";

const Driver = () => {
  let navigate = useNavigate();
  let { ref } = useParams();

  const [{ data, loading, error }, refetch] = useAxios<DriverType>({
    url: `${process.env.REACT_APP_API_URL}/driver`,
    params: {
      ref: ref,
    },
  });

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: getSearchData,
  } = useSearch(searchText);

  useEffect(() => {
    if (debouncedSearchText.length > 0) getSearchData();
  }, [debouncedSearchText]);

  const navigateSearch = (name: string, ref: string, type: Category) => {
    navigate(`/${type}/${ref}`);
  };

  // if (data) console.log(Object.entries(data.years)[1]);
  console.log(data);
  if (data) console.log(typeof Object.entries(data));

  const ordinalSuffix = (number: number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const cellColour = (position: number) => {
    switch (position) {
      case 1:
        return "gold";
      case 2:
        return "silver";
      case 3:
        return "#CD7F32";
    }
  };

  return (
    <Layout
      heading={`f1app - ${data?.driver.forename} ${data?.driver.surname}`}
      searchData={searchData || []}
      onResultClick={navigateSearch}
      onChange={(input) => setSearchText(input)}
    >
      {data && (
        <Box sx={{ margin: 10 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>year</TableCell>
                  {data.rounds.map((round) => {
                    return <TableCell>{round}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data.years).map(([year, results]) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {year}
                      </TableCell>
                      {results.results.map((result) => (
                        <TableCell
                          sx={{
                            backgroundColor: result.position
                              ? cellColour(result.position)
                              : "",
                          }}
                        >
                          {result.position
                            ? `${result.position}${ordinalSuffix(
                                result.position
                              )}`
                            : "DNF"}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Layout>
  );
};

export default Driver;
