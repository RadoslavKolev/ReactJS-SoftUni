import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import UsersTable from '../UsersTable/UsersTable';

const UsersContainer = () => {
  return (
    <section className="card users-container">
      <SearchBar />
      <UsersTable />
    </section>
  );
};

export default UsersContainer;