import Footer from "../Footer";
import Header from "../Header";

import Category from "../../types/Category";
import SearchResponse from "../../types/SearchResponse"

interface Props {
  heading: string;
  searchData: SearchResponse;
  onResultClick: (name: string, ref: string, type: Category, _id: string) => void;
  onChange: (input: string) => void;
}

const Layout: React.FC<Props> = ({
  heading,
  children,
  searchData,
  onResultClick,
  onChange
}) => {
  return (
    <>
      <Header
        heading={heading}
        data={searchData}
        onResultClick={onResultClick}
        onChange={onChange}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
