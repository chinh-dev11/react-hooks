/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import Header from './components/Header';
import Todo from './components/Todo';
import Auth from './components/Auth';

const app = props => {
  const [page, setPage] = useState('auth');

  const switchPage = pageName => {
    setPage(pageName);
  };

  return (
    <div className="App">
      <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
      {/* <Header onLoadTodos={() => switchPage('todos')} onLoadAuth={() => switchPage('auth')} /> */}
      <hr />
      {page === 'todos' ? <Todo /> : <Auth />}
    </div>
  );
};

export default app;
