import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutProps {
  children: any;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
