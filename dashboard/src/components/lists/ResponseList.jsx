export default function ResponseList({
  id,
  materiales,
  precioMateriales,
  manoDeObra,
  precioManoDeObra,
  duracionTrabajo,
  comentariosTrabajo,
  precioFinal,
  estado,
  reqId,  
  users,
  userId
}) {
  return (
    <tr>
      <td>{id}</td>      
      <td>{reqId}</td>
      <td>{users.name} {users.lastName}</td>
      <td>{userId}</td>
      <td>{materiales}</td>
      <td>{precioMateriales}</td>
      <td>{manoDeObra}</td>
      <td>{precioManoDeObra}</td>
      <td>{duracionTrabajo}</td>
      <td>{comentariosTrabajo}</td>
      <td>{precioFinal}</td>
      <td>{estado}</td>
    </tr>
  );
}
