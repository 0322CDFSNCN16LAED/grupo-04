import BigCard from "./BigCard";
import PropTypes from "prop-types";

const propTypes = {
  lastUser: PropTypes.object.isRequired,
  lastBudgetRes: PropTypes.object.isRequired,
};
export default function LastUser({ lastUser, lastBudgetRes }) {
  return (
    <>
      <BigCard title="Ultimo presupuesto creado">
        <h2 className="text-center">
          {lastBudgetRes.budget_request.tituloSolicitud}
        </h2>
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "40rem" }}
            src={`http://localhost:3001/images/budgetRequest/${lastBudgetRes.budget_request.req_imgs[0].img}`}
            alt=" imagen presupuesto "
          />
        </div>
        <div>
          <div className="d-flex p-2 justify-content-start">
            <p className="col-2 font-weight-bold">Detalle: </p>
            <p>{lastBudgetRes.budget_request.detalleSolicitud}</p>
          </div>
          <div className="d-flex p-2 justify-content-start">
            <p className="col-2 font-weight-bold">Pedido Por:</p>
            <p>
              {lastBudgetRes.budget_request.users.name}{" "}
              {lastBudgetRes.budget_request.users.lastName}
            </p>
          </div>
          <div className="d-flex p-2 justify-content-start">
            <p className="col-2 font-weight-bold">Respondido Por:</p>
            <p>
              {lastBudgetRes.users.name} {lastBudgetRes.users.lastName}
            </p>
          </div>
        </div>
        <a
          className="btn btn-danger"
          target="_blank"
          rel="noreferrer"
          href={`${lastBudgetRes.detail}`}
        >
          Ver Detalle del presupuesto
        </a>
      </BigCard>
      <BigCard title="Ultimo usuario creado">
        <h2 className="text-center">
          {lastUser.name} {lastUser.lastName}
        </h2>
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "20rem" }}
            src={`http://localhost:3001/images/avatar/${lastUser.avatar}`}
            alt=" User-Avatar"
          />
        </div>
        <div className="d-flex p-2 justify-content-start">
          <p className="col-2 font-weight-bold">Email:</p>
          <p>{lastUser.email}</p>
        </div>
        <div className="d-flex p-2 justify-content-start">
          <p className="col-2 font-weight-bold">Provincia:</p>
          <p>{lastUser.state}</p>
        </div>
        <div className="mb-3 d-flex p-2 justify-content-start">
          <p className="col-2 font-weight-bold">Ciudad:</p>
          <p>{lastUser.city}</p>
        </div>
        <a
          className="btn btn-danger"
          target="_blank"
          rel="noreferrer"
          href={`${lastUser.detail}`}
        >
          Ver Detalle de Usuario
        </a>
      </BigCard>
    </>
  );
}
LastUser.propTypes = propTypes;
LastUser.defaultProps = {
  lastUser: {},
};
