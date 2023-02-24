import "./App.css";
import Home from "./component/Home/Home";
import Kids from "./component/Kids/Kids";
import Mens from "./component/Mens/Mens";
import SingleCardPage from "./component/Womens/SingleCardPage";
import Navbar from './component/Navbar/Navbar';
import { useMediaQuery } from '@chakra-ui/react'
import MobileNav from './component/Navbar/MobileNav';
import Womens from "./component/Womens/Womens";
import AllRoutes from "./Routes/AllRoutes";
import Footer from "./component/Footer/Footer";

function App() {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  return (
    <div className="App">
      {isLargerThan800?<Navbar />:<MobileNav />}
      <AllRoutes />
      <Footer/>
    </div>
  );
}

export default App;
