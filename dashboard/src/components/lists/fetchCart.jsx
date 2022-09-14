import React from "react";
import { useState, useEffect } from "react";
import CartList from "./CartList";

const EXPRESS_HOST = "http://localhost:3001/api";

const CartListFc = () => {
  const [cartL, setcartL] = useState([]);
  const [isCartListLoading, setisCartListLoading] = useState(false);

  const fetchCartList = async () => {
    try {
      setisCartListLoading(true);
      const result = await fetch(`${EXPRESS_HOST}/budget/cart/list`);
      const cartResult = await result.json();
      console.log(JSON.stringify(cartResult, null, 4));
      setcartL(cartResult);
    } catch (error) {
      console.log("error", error);
    } finally {
      setisCartListLoading(false);
    }
  };
  useEffect(() => {
    console.log("fetching cart List");
    fetchCartList();
  }, []);

  return (
    <React.Fragment>
      <h1 className="h3 mb-2 text-gray-800">
        Todos los presupuestos agendados de la base de datos
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
                  <th>ResId</th>
                  <th>Pedido Por</th>
                  <th>Respondido Por</th>
                  <th>Dia</th>
                  <th>Horario</th>
                  <th>MetodoPago</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Id</th>
                  <th>ResId</th>
                  <th>Pedido Por</th>
                  <th>Respondido Por</th>
                  <th>Dia</th>
                  <th>Horario</th>
                  <th>MetodoPago</th>
                  <th>Estado</th>
                </tr>
              </tfoot>
              {isCartListLoading ? (
                <p>Loading...</p>
              ) : (
                <tbody>
                  {cartL.map((budget) => {
                    return <CartList {...budget} key={budget.id} />;
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
export default CartListFc;
