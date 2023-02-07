import React from "react";

import Header from "./components/common/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import UsersTable from "./components/UsersTable/UsersTable";
import Footer from "./components/common/Footer/Footer";

import "./App.css";

const App = () => {
  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <SearchBar />
          <UsersTable />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default App;
