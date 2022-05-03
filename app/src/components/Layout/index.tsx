import Footer from "../Footer";
import Header from "../Header";

import Category from "../../types/Category";

interface Props {
  heading: string;
  searchData: { name: string; type: Category }[];
  onResultClick: (name: string, type: Category) => void;
}

const Layout: React.FC<Props> = ({
  heading,
  children,
  searchData,
  onResultClick,
}) => {
  return (
    <>
      <Header
        heading={heading}
        data={searchData}
        onResultClick={onResultClick}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
