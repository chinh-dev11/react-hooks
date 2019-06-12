/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import AuthContext from '../auth-context';

const auth = props => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <h1>Auth Component</h1>
            <button onClick={auth.login}>Log in!</button>
        </div>
    )
};

export default auth;