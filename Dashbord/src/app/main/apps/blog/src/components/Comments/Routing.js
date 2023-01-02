import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";
import RoutingSwitch from "./RoutingSwitch";
import PostFormModal from "./PostFormModal";



function Routing() {
  return (
    <Router>
      <Header />
      <RoutingSwitch />
      <PostFormModal />
      
    </Router>
  );
}

export default Routing;