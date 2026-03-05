import { NavLink } from "react-router-dom";
import "./Navbar.css";

const linkClass = ({ isActive }) => (isActive ? "active" : "");

function Navbar() {
    return (
        <header className="navbar">
            <div className="navBrand">API Demo</div>
            <nav className="navLinks">
                <NavLink to="/universities" className={linkClass}>
                    Universities
                </NavLink>
                <NavLink to="/currency" className={linkClass}>
                    Currency
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
