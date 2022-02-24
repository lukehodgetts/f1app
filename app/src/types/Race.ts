interface Race {
  _id: string;
  raceId: number;
  year: string;
  round?: number;
  circuit: {
    name: string;
  };
  name: string;
  date: string;
  time?: string;
  url?: string;
  results: {
    driver: {
      _id: string;
      driverId: string;
      driverRef: string;
      number?: number;
      code?: string;
      forename: string;
      surname: string;
      dob: string;
      nationality: string;
      url: string;
    };
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
}

export default Race;
