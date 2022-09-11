import React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import MensajeSecreto from "../MensajeSecreto";
import Movie from "./Movie";

const EXPRESS_HOST = "http://localhost:3001/api";

const BudgetList = () => {
  const [budgetL, setBudgetL] = useState([]);
  const [isBudgetLoading, setIsBudgetLoading] = useState(false);

  const fetchBudget = async () => {
    try {
      setIsBudgetLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/list`);
      const budgetResult = await result.json();
      console.log(JSON.stringify(budgetResult, null, 4));
      setBudgetL(budgetResult);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBudgetLoading(false);
    }
  };
  useEffect(() => {
    console.log("fetching budget List");
    fetchBudget();
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
              {isBudgetLoading ? (
                <p>Loading...</p>
              ) : (
                <tbody>
                  {budgetL.map((budget) => {
                    return <Movie {...budget} key={budget.id} />;
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <Route path="/movies/gatitos" component={MensajeSecreto} />
    </React.Fragment>
  );
};
export default BudgetList;
