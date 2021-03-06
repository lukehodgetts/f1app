import { useNavigate, useParams } from "react-router";
import useAxios from "axios-hooks";

import RaceType from "../../types/RaceDetails";
import ImageType from "../../types/Image";
import Category from "../../types/Category";

import Layout from "../../components/Layout";
import PodiumCard from "../../components/PodiumCard";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import driverImages from "../../utils/driverImages";
import circuitImages from "../../utils/circuitImages";
import SearchResponse from "../../types/SearchResponse";

import { useState } from "react";

const Race = () => {
  let navigate = useNavigate();
  let { name, year } = useParams();

  const [searchText, setSearchText] = useState("");

  const [{ data, loading, error }, refetch] = useAxios<RaceType>(
    `${process.env.REACT_APP_API_URL}/${year}/${name}/singleRace`
  );

  const [
    { data: searchData, loading: searchLoading, error: searchError },
    getSearchData,
  ] = useAxios<SearchResponse>({
    url: `${process.env.REACT_APP_API_URL}/search`,
    params: {
      searchText: searchText,
    },
  });

  if (loading || !data) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  const findImage = (id: string, type: ImageType) => {
    let foundImage = Object.values(
      type === "driver" ? driverImages : circuitImages
    ).find((value) => {
      return type === "driver" ? value.driverId === id : value.circuitId === id;
    });
    return foundImage?.image;
  };

  const fastestLap = data.results.find((driver) => driver.rank === 1);

  const navigateSearch = (
    name: string,
    ref: string,
    type: Category,
    _id: string
  ) => {
    navigate(`/${type}/${ref}`);
  };

  console.log(data);
  console.log(fastestLap?.fastestLapTime);

  return (
    <>
      {data && (
        <Layout
          heading={`${data.year} ${data.name}`}
          searchData={searchData || []}
          onResultClick={navigateSearch}
          onChange={(input) => setSearchText(input)}
        >
          <Box margin="10px">
            <Grid container spacing={2} height="100%">
              <Grid item xs={5}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>pos</TableCell>
                        <TableCell align="center">driver</TableCell>
                        <TableCell align="right">time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.results.map((driver) => (
                        <TableRow key={driver.driver.driverId}>
                          <TableCell component="th" scope="row">
                            {driver.position === 100 ? "DNF" : driver.position}
                          </TableCell>
                          <TableCell align="center">
                            {driver.driver.forename} {driver.driver.surname}
                          </TableCell>
                          <TableCell align="right">
                            {driver.time === null
                              ? driver.status.status
                              : driver.time}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid container spacing={2} height="100%" xs={7} margin="0px">
                {data.results.slice(0, 3).map((driver) => {
                  return (
                    <Grid item xs={4}>
                      <PodiumCard
                        name={`${driver.driver.forename} ${driver.driver.surname}`}
                        position={driver.position?.toString()!}
                        image={findImage(driver.driver._id, "driver")!}
                      />
                    </Grid>
                  );
                })}
                {fastestLap && (
                  <Grid item xs={4}>
                    <PodiumCard
                      name={`${fastestLap.driver.forename} ${fastestLap.driver.surname}`}
                      fastestLapTime={fastestLap.fastestLapTime}
                      image={findImage(fastestLap.driver._id, "driver")!}
                    />
                  </Grid>
                )}
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={findImage(data.circuit._id, "circuit")!}
                      alt={`image of ${data.circuit.name}`}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default Race;
