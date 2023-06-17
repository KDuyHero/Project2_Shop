import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import { toast } from "react-hot-toast";

import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCartShopping,
  faCircleUser,
  faListCheck,
  faRegistered,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [auth, setAuth] = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      const response = await axios.get("/brands");
      if (response?.data?.success) {
        setBrands(response.data.brands);
      }
    } catch (error) {
      console.log(error);
      toast.error("Get error in get all brand with header");
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    alert(`Search with ${searchInput}`);
    setSearchInput("");
  };

  return (
    <div className="d-flex flex-column header-wrapper">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {/* Header content */}
        <div className="container header">
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Logo shop */}
            <Link to="/" className="navbar-brand">
              <div
                className="header-logo"
                style={{
                  // height: "100%",
                  // width: "100%",
                  backgroundColor: "#b75252",
                }}
              >
                DBĐ
              </div>
            </Link>
            <form
              className="d-flex search-form"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Search
              </button>
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {auth?.user?.isAdmin && (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    <FontAwesomeIcon icon={faAddressBook} /> Admin
                  </NavLink>
                </li>
              )}

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      <FontAwesomeIcon icon={faRegistered} /> Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link ">
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      to="/dropdown"
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "white" }}
                    >
                      <FontAwesomeIcon icon={faCircleUser} />
                      {` ${auth.user.firstName} ${auth.user.lastName}`}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to="/user" className="dropdown-item">
                          <FontAwesomeIcon icon={faListCheck} /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link ">
                  <FontAwesomeIcon icon={faCartShopping} /> Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-center flex-row brands-container">
        {brands.map((brand, index) => {
          return (
            <NavLink
              to={`/products/brands/${brand.name}`}
              key={index}
              className="col-2 col-lg-1 g-0 text-center brand"
            >
              {brand.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
