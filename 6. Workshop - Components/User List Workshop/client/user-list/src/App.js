import React, { useEffect, useState } from "react";

import * as userService from "./services/userService";
import Header from "./components/common/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import UsersTable from "./components/UsersTable/UsersTable";
import Footer from "./components/common/Footer/Footer";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  // We use useEffect to prevent infinite loop (setUsers calls the component again)
  // We take the getAllUsers() and set them in the users state
  // This operation runs when the component is initially rendered
  useEffect(() => {
    userService.getAllUsers()
      .then(users => setUsers(users));
  }, []);

  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <SearchBar />
          <UsersTable users={users} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default App;
