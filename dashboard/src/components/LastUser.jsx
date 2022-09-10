import BigCard from "./BigCard";
import PropTypes from "prop-types";

const propTypes = {
  lastUser: PropTypes.object.isRequired,
};
export default function LastUser({ lastUser, lastBudgetRes }) {
  console.log(JSON.stringify(lastBudgetRes,null,4));
  return (
    <>
      <BigCard title="Ultimo presupuesto creado">
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "40rem" }}
            src={`http://localhost:3001/images/budgetRequest/${lastBudgetRes.budget_request.req_imgs[0].img}`}
            alt=" Star Wars - Mandalorian "
          />
        </div>
        <div>
          <div>
            Titulo de la Solicitud:{" "}
            {lastBudgetRes.budget_request.tituloSolicitud}
          </div>
          <div className="mb-3">
            Detalle de la Solicitud:{" "}
            {lastBudgetRes.budget_request.detalleSolicitud}
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
        <div>Email: {lastUser.email}</div>
        <div>Provincia: {lastUser.state}</div>
        <div className="mb-3">Ciudad: {lastUser.city}</div>
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
