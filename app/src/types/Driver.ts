interface Driver {
  driver: {
    code: string;
    dob: string;
    driverId: number;
    driverRef: string;
    forename: string;
    surname: string;
    nationality: string;
    number: number;
    url: string;
    _id: string;
  };
  years: {
    [key: string]: {
      results: {
        driver: string;
        team: {
          _id: string;
          constructorId: string;
          constructorRef: string;
          name: string;
          nationality: string;
          url: string;
        };
        number?: number;
        grid: number;
        position?: number;
        points: number;
        laps: number;
        time?: string;
        fastestLap?: number;
        rank?: number;
        fastestLapTime?: string;
        status: {
          _id: string;
          statusId: number;
          status: string;
        };
      }[];
    };
  };
  rounds: number[];
}

export default Driver;
