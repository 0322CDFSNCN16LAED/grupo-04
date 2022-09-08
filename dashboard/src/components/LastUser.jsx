import mandalorian from "../assets/images/mandalorian.jpg";
import BigCard from "./BigCard";
import PropTypes from "prop-types";

const propTypes = {
  lastUser: PropTypes.object.isRequired,
};
export default function LastUser({lastUser}) {
  return (
    <>
      <BigCard title="Ultimo presupuesto creado">
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "40rem" }}
            src={mandalorian}
            alt=" Star Wars - Mandalorian "
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          consequatur explicabo officia inventore libero veritatis iure
          voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis
          quae dolorem culpa citationem ratione aperiam voluptatum non corporis
          ratione aperiam voluptatum quae dolorem culpa ratione aperiam
          voluptatum?
        </p>
        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
          View movie detail
        </a>
      </BigCard>
      <BigCard title="Ultimo usuario creado">
        <h2 className="text-center">
          {lastUser.name} {lastUser.lastName}
        </h2>
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "40rem" }}
            src={`../../../website/public/images/avatar/${lastUser.avatar}`}
            alt=" User-Avatar"
          />
        </div>
        <div>Email: {lastUser.email}</div>
        <div>Provincia: {lastUser.state}</div>
        <div>Ciudad: {lastUser.city}</div>
        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
          View movie detail
        </a>
      </BigCard>
    </>
  );
}
LastUser.propTypes = propTypes;
LastUser.defaultProps = {
  lastUser: {},
};
