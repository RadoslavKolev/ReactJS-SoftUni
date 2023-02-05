import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.course}>React Course - June 2022</span>
        <span className={styles.description}>User List Demo</span>
      </div>
    </header>
  );
};

export default Header;
