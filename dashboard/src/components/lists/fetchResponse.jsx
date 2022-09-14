import React from "react";
import { useState, useEffect } from "react";
import ResponseList from "./ResponseList";

const EXPRESS_HOST = "http://localhost:3001/api";

const BudgetResponseList = () => {
  const [responseL, setresponseL] = useState([]);
  const [isBudgetResponseLoading, setisBudgetResponseLoading] = useState(false);

  const fetchBudgetResponse = async () => {
    try {
      setisBudgetResponseLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/response/list`);
      const budgetResult = await result.json();
      setresponseL(budgetResult);
    } catch (error) {
      console.log("error", error);
    } finally {
      setisBudgetResponseLoading(false);
    }
  };
  useEffect(() => {
    console.log("fetching budget response List");
    fetchBudgetResponse();
  }, []);

  return (
    <React.Fragment>
      <h1 className="h3 mb-2 text-gray-800">
        Todos los presupuestos respondidos de la base de datos
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
                  <th>reqId</th>
                  <th>Respondido Por</th>
                  <th>Id Prof</th>
                  <th>materiales</th>
                  <th>precioMateriales</th>
                  <th>manoDeObra</th>
                  <th>precioManoDeObra</th>
                  <th>duracionTrabajo</th>
                  <th>comentariosTrabajo</th>
                  <th>precioFinal</th>
                  <th>estado</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Id</th>
                  <th>reqId</th>
                  <th>Respondido Por</th>
                  <th>Id Prof</th>
                  <th>materiales</th>
                  <th>precioMateriales</th>
                  <th>manoDeObra</th>
                  <th>precioManoDeObra</th>
                  <th>duracionTrabajo</th>
                  <th>comentariosTrabajo</th>
                  <th>precioFinal</th>
                  <th>estado</th>
                </tr>
              </tfoot>
              {isBudgetResponseLoading ? (
                <p>Loading...</p>
              ) : (
                <tbody>
                  {responseL.map((budget) => {
                    return <ResponseList {...budget} key={budget.id} />;
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default BudgetResponseList;
