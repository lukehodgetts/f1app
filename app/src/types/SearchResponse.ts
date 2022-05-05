import Category from "./Category";

type SearchResponse = {
  _id: string;
  name: string;
  type: Category;
}[]

export default SearchResponse;
