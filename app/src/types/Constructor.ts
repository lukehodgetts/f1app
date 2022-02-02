interface Constructor {
  type: "Constructor";
  MRData: {
    StandingsTable: {
      StandingsLists: [
        {
          ConstructorStandings: [
            {
              position: string;
              points: string;
              wins: string;
              Constructor: {
                constructorId: string;
                name: string;
              };
            }
          ];
        }
      ];
    };
  };
}

export default Constructor;
