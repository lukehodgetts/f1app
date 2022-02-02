interface Race {
  MRData: {
    RaceTable: {
      Races: [
        {
          season: string;
          round: string;
          raceName: string;
          Circuit: {
            circuitName: string;
          };
          date: string;
          Results: [
            {
              number: string;
              position: string;
              points: string;
              Driver: {
                code: string;
                givenName: string;
                familyName: string;
                nationality: string;
              };
              Constructor: {
                name: string;
              };
              grid: string;
              laps: string;
              status: string;
              FastestLap: {
                rank: string;
                lap: string;
                Time: {
                  time: string;
                };
                AverageSpeed: {
                  speed: string;
                };
              };
            }
          ];
        }
      ];
    };
  };
}

export default Race;
