import React from "react";
import { useState, useEffect } from "react";
// import { Route } from "react-router-dom";
// import MensajeSecreto from "../MensajeSecreto";
import BudgetsRequestList from "./BudgetsRequestList";


const EXPRESS_HOST = "http://localhost:3001/api";

const BudgetsReqtList = () => {
  const [budgetL, setBudgetL] = useState([]);

  const [isBudgetRequestLoading, setisBudgetRequestLoading] = useState(false);

  const fetchBudgetRequest = async () => {
    try {
      setisBudgetRequestLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/list`);
      const budgetResult = await result.json();
      // console.log(JSON.stringify(budgetResult, null, 4));
      setBudgetL(budgetResult);
    } catch (error) {
      console.log("error", error);
    } finally {
      setisBudgetRequestLoading(false);
    }
  };
 
  useEffect(() => {
    console.log("fetching budget List");
    fetchBudgetRequest();    
  }, []);

  return (
    <React.Fragment>
      <h1 className="h3 mb-2 text-gray-800">
        Todos los presupuestos de la base de datos
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Titulo</th>
                  <th>Detalle</th>
                  <th>Rubro</th>
                  <th>Ubicacion</th>
                  <th>Estado</th>
                  <th>Urgencia</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Id</th>
                  <th>Titulo</th>
                  <th>Detalle</th>
                  <th>Rubro</th>
                  <th>Ubicacion</th>
                  <th>Estado</th>
                  <th>Urgencia</th>
                </tr>
              </tfoot>
              {isBudgetRequestLoading ? (
                <p>Loading...</p>
              ) : (
                <tbody>
                  {budgetL.map((budget) => {
                    return <BudgetsRequestList {...budget} key={budget.id} />;
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* <Route path="/movies/gatitos" component={MensajeSecreto} /> */}
    </React.Fragment>
  );
};
export default BudgetsReqtList;
