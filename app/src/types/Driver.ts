interface Driver {
  type: "Driver";
  DriverStandings: {
    position: string;
    points: string;
    wins: string;
    Driver: {
      driverId: string;
      permanentNumber: string;
      code: string;
      givenName: string;
      familyName: string;
      dateOfBirth: string;
      nationality: string;
    };
    Constructors: {
      name: string;
    }[];
  }[];
}

export default Driver;
