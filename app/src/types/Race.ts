interface Race {
  _id: string;
  raceId: number;
  year: string;
  round?: number;
  circuit: {
    name: string;
    country: string;
    location: string;
    url: string;
    _id: string;
  };
  name: string;
  date: string;
  time?: string;
  url?: string;
}

export default Race;
