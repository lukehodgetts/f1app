import useAxios from "axios-hooks";
import SearchResponse from "../types/SearchResponse";

function useSearch(searchText: string) {
  const [{ data, loading, error }, refetch] = useAxios<SearchResponse>(
    {
      url: `${process.env.REACT_APP_API_URL}/search`,
      params: {
        search: searchText,
      },
    },
    { manual: true }
  );

  return { data, loading, error, refetch };
}

export default useSearch;
