/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import Header from './components/Header';
import Todo from './components/Todo';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const app = props => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = pageName => {
    setPage(pageName);
  };

  const loginHandler = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: loginHandler }}>
        <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
        {/* <Header onLoadTodos={() => switchPage('todos')} onLoadAuth={() => switchPage('auth')} /> */}
        <hr />
        {page === 'todos' ? <Todo /> : <Auth />}
      </AuthContext.Provider>

    </div>
  );
};

export default app;
