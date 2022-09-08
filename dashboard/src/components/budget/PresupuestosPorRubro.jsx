import React from "react";
import {Budget} from "./Budget";
import BigCard from "../BigCard";
import PropTypes from "prop-types";

const propTypes = {
  countByCategory: PropTypes.object.isRequired,
};

const PresupuestosPorRubro = ({countByCategory}) => {
    return (
      <BigCard title="Cantidad de presupuestos por rubro">
        <div className="row">
          {Object.keys(countByCategory).map((category) => (
            <Budget key={category} category={category} count={countByCategory[category]} />
          ))}
        </div>
      </BigCard>
    );
}

PresupuestosPorRubro.propTypes = propTypes;
PresupuestosPorRubro.defaultProps = {
  countByCategory: {}
};

export default PresupuestosPorRubro;
