import Footer from "../Footer";
import Header from "../Header";

interface Props {
  heading: string;
}

const Layout: React.FC<Props> = ({ heading, children }) => {
  return (
    <>
      <Header heading={heading} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
