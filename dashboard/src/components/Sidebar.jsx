import React from "react";
import { Link } from "react-router-dom";

import logoReparaYa from "../assets/images/logoReparaYa.svg";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img className="w-100" src={logoReparaYa} alt="Digital House" />
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard - Repara Ya</span>
        </a>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Actions</div>

      {/* <!-- Nav Item - Pages --> */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/budgets" exact="true">
          <i className="fas fa-fw fa-folder"></i>
          <span>Budgets Request</span>
        </Link>
      </li>  
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/budgets/response" exact="true">
          <i className="fas fa-fw fa-folder"></i>
          <span>Budgets Response</span>
        </Link>
      </li>  
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/cart/list" exact="true">
          <i className="fas fa-fw fa-folder"></i>
          <span>Cart List</span>
        </Link>
      </li>  
   

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default Sidebar;
