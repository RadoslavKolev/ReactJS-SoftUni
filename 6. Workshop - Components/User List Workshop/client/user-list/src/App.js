import React, { useEffect, useState } from 'react';

import Header from './components/common/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import UsersTable from './components/UsersTable/UsersTable';
import Footer from './components/common/Footer/Footer';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  const baseUrl = 'http://localhost:3005/api'

  // Getting the users from the server via Fetch API
  // We use useEffect to prevent infinite loop (setUsers calls the component again)
  // The fetch operation runs when the component is initially rendered
  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then(response => response.json())
      .then(result => setUsers(result.users));
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
