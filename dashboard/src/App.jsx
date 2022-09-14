import "./App.css";
import Dashboard from "./components/Dashboard";
import BudgetsReqList from "./components/lists/fetchRequest";
import BudgetResponseList from "./components/lists/fetchResponse";
import CartListFc from "./components/lists/fetchCart";
import Sidebar from "./components/Sidebar";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div id="wrapper">
      {/* <!-- Sidebar --> */}
      <Sidebar />
      {/* <!-- End of Sidebar --> */}

      {/* <!-- Content Wrapper --> */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Content Row Top --> */}
          <div className="container-fluid pt-5">
            <Switch>
              <Route path="/" component={Dashboard} exact={true} />
              <Route path="/cart/list" component={CartListFc} />
              <Route path="/budgets/response" component={BudgetResponseList} />
              <Route path="/budgets" component={BudgetsReqList} />
            </Switch>
          </div>
          {/* <!--End Content Row Top--> */}
        </div>
        {/* <!-- End of MainContent --> */}

        {/* <!-- Footer --> */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Dashboard 2021</span>
            </div>
          </div>
        </footer>
        {/* <!-- End of Footer --> */}
      </div>
      {/* <!-- End of Content Wrapper --> */}
    </div>
  );
}

export default App;
