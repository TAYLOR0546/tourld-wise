// import { Link, NavLink } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          {/* <Link to="/">Home</Link> */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {/* <Link to="/pricing">Pricing</Link> */}
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          {/* <Link to="/product">Home</Link> */}
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
