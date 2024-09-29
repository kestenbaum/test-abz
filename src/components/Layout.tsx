import Header from './header/Header';
import FirstScreen from './FirstScreen';
import Users from './users/Users';
import Auth from './auth/Auth';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <FirstScreen />
      <Users />
      <Auth />
      <Footer />
    </>
  );
};

export default Layout;
