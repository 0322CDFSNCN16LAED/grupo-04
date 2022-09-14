import dayjs from "dayjs";
export default function CartList({
  id,
  resId,
  userId,
  dia,
  horario,
  metodoPago,
  estado,
  users,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{resId}</td>
      <td>
        {users.name} {users.lastName}
      </td>
      <td>{userId}</td>
      <td>{dayjs(dia).format("YYYY-MM-DD")}</td>
      <td>{horario}</td>
      <td>{metodoPago}</td>
      <td>{estado}</td>
    </tr>
  );
}
