// React Hook "useState" is called in function "todo" which is neither a React function component or a custom React Hook function.eslint(react-hooks/rules-of-hooks)
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';

const todo = props => {
    // REM: useState() 
    /**    
     *     argument (eg: 'someValue'):  can be anything ('', 0, null, [], {},...)
     *     return value (eg: inputState): an array
     *         [0]: argument received
     *         [1]: function can be used to manipulate the state
     * 
     *     Recommended: use useState() separately to manipulate different states (todoName, todoList), hence state changes are independent from one of the other
    */
    // const [todoName, setTodoName] = useState('someValue');
    // console.log('todoName: ', todoName);
    // const inputState = useState('someValue');
    // console.log('inputState: ', inputState);

    // const [todoList, setTodoList] = useState([]);
    // console.log('todoList: ', todoList);

    // merging different states in one - NOT RECOMMENDED!!!
    // REM: the hook (setTodoState) does update but NOT MERGE the states therefore requires manual merging (as in todoAddHandler()), unlike setSate() in class-based component
    const [todoState, setTodoState] = useState({
        userInput: '',
        todoList: []
    });

    const inputChangeHandler = (evt) => {
        // console.log('evt: ', evt.target.value);
        setTodoState({
            userInput: evt.target.value,
            todoList: todoState.todoList
        });
        // setTodoName(evt.target.value);
        // inputState[1](evt.target.value);
    };

    const todoAddHandler = () => {
        setTodoState({
            userInput: todoState.userInput,
            todoList: todoState.todoList.concat(todoState.userInput)
        });
        // setTodoList(todoList.concat(todoName)); // add new element (todoName) to the todoList state array
    };

    return (
        // React.Fragment: allows top level siblings 
        <React.Fragment>
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoState.userInput} /> {/* functional component */}
            {/* <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} /> */} {/* functional component */}
            {/* <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={inputState[0]} /> */} {/* functional component */}
            {/* <input type="text" placeholder="Todo" onChange={this.inputUserHandler} value={this.state.todoValue} /> */} {/* class-based component */}
            <button type="button" onClick={todoAddHandler}>Add</button>
            <ul>
                {todoState.todoList.map(todo => <li key={todo}>{todo}</li>)}
                {/* {todoList.map(todo => <li key={todo}>{todo}</li>)} */}
            </ul>
        </React.Fragment>
    );
};

export default todo;