interface Constructor {
  type: "Constructor";
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

export default Constructor;
