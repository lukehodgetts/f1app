import { useParams } from "react-router";
import useAxios from "axios-hooks";

import RaceType from "../../types/Race";

import Layout from "../../components/Layout";
import PodiumCard from "../../components/PodiumCard";
import Grid from "@mui/material/Grid";

import images from "../../utils/driverImages";

const Race = () => {
  let { name, year } = useParams();
  const [{ data, loading, error }, refetch] = useAxios<RaceType>(
    `${process.env.REACT_APP_API_URL}/${year}/${name}/singleRace`
  );

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      {data && (
        <Layout heading={`${data.year} ${data.name}`}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              hi
            </Grid>
            {data.results.slice(0, 3).map((driver) => {
              return (
                <Grid item xs={2}>
                  <PodiumCard
                    name={`${driver.driver.forename} ${driver.driver.surname}`}
                    position={driver.position?.toString()!}
                    image={images.max.image}
                  />
                </Grid>
              );
            })}
            <Grid item xs={2}>
              im
            </Grid>
            <Grid item xs={2}>
              im
            </Grid>
            <Grid item xs={2}>
              im
            </Grid>
            <Grid item xs={6}>
              buk
            </Grid>
            <Grid item xs={6}>
              yes
            </Grid>
          </Grid>
        </Layout>
      )}
    </>
  );
};

export default Race;
