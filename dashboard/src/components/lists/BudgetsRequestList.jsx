export default function BudgetsRequestList({
  id,
  tituloSolicitud,
  detalleSolicitud,
  rubroNombre,
  ubicacion,
  estado,
  urgenciaTrabajo,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{tituloSolicitud}</td>
      <td>{detalleSolicitud}</td>
      <td>{rubroNombre}</td>
      <td>{ubicacion}</td>
      <td>{estado}</td>
      <td>{urgenciaTrabajo}</td>
    </tr>
  );
}
