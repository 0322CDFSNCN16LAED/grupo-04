import PresupuestosPorRubro from "./genres/PresupuestosPorRubro";
import LastMovie from "./LastMovie";
import MiniCard from "./MiniCard";
import { useState, useEffect, useRef } from "react";

const EXPRESS_HOST = "http://localhost:3001/api/users";

function SearchUsers() {
    
    const [users, setUsers] = useState([]);
    let user = useRef()
    
    const keyword = "PELÍCULA DEMO";
    function searchUser(e) {
        e.preventDefault();
        //movie = e.target.search.value;
        
    }

    useEffect(()=>{
        fetch(`${EXPRESS_HOST}`) 
        .then( function(respuesta) {
            return respuesta.json();
            })
            .then ( function(informacion) {
                setUsers(informacion);
                console.log(informacion)
            })
            .catch( function(error){
                console.log(error)
            })
        },[user]
    )
}
const miniCards = [
  {
    id: "5",
    title: "Total de Profesionales",
    value: "",
    icon: "fa-user"
  },
  {
    id: "24",
    title: "Total de usuarios",
    color: "success",
    value: "79",
    icon: "fa-user",
  },
  {
    id: "32",
    title: "Total de rubros",
    color: "warning",
    value: "49",
    icon: "fa-user",
  },
  {
    id: "32",
    title: "Total de presupuestos pedidos",
    color: "info",
    value: "49",
    icon: "fa-user",
  },
  {
    id: "32",
    title: "Total de presupuestos respondidos",
    color: "secondary",
    value: "49",
    icon: "fa-user",
  },
  {
    id: "32",
    title: "Total de trabajos contratados",
    color: "danger",
    value: "49",
    icon: "fa-award",
  },
]

export default function Dashboard() {
    return (
      <>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>

        {/* <!-- Content Row Movies--> */}
        <div className="row">
          {/* <!-- Movies in Data Base --> */}
          {miniCards.map((data) => {
            return <MiniCard {...data} key={data.id} />;
          })}
        </div>
        {/* <!-- End movies in Data Base --> */}

        {/* <!-- Content Row Last Movie in Data Base --> */}
        <div className="row">
          {/* <!-- Last Movie in DB --> */}
          <LastMovie />
          {/* <!-- End content row last movie in Data Base --> */}

          {/* <!-- Genres in DB --> */}
          <PresupuestosPorRubro />
        </div>
      </>
    );
}
