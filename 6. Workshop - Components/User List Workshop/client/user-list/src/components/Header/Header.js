import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header class={styles.header}>
      <div class={styles.logo}>
        <span class={styles.course}>React Course - June 2022</span>
        <span class={styles.description}>User List Demo</span>
      </div>
    </header>
  );
};

export default Header;
