// React Hook "useState" is called in function "todo" which is neither a React function component or a custom React Hook function.eslint(react-hooks/rules-of-hooks)
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
    // REM: useState() 
    /**    
     *     argument (eg: ''):  can be anything ('', 0, null, [], {},...)
     *     return value (eg: inputState): an array
     *         [0]: argument received
     *         [1]: function can be used to manipulate the state
     * 
     *     Recommended: use useState() separately to manipulate different states (todoName, todoList), hence state changes are independent from one of the other
    */
    const [todoName, setTodoName] = useState('');
    console.log('todoName: ', todoName);
    // const inputState = useState('');
    // console.log('inputState: ', inputState);

    const [todoList, setTodoList] = useState([]);
    // console.log('todoList: ', todoList);

    // merging different states in one - NOT RECOMMENDED!!!
    // REM: the hook (setTodoState) does update but NOT MERGE the states therefore requires manual merging (as in todoAddHandler()), unlike setSate() in class-based component
    /* const [todoState, setTodoState] = useState({
        userInput: '',
        todoList: []
    }); */

    // REM: avoid to run any code that causes side-effects or manual DOM manipulating during React rendering cycle, as the following, since it might cause:
    /**
     *      - undesirable behavior (UI is not updated bc React has already completed its rendering cycle when request resolved)
     *      - performance issues bc of too many updates
     */
    /* axios.get('https://react16-hooks.firebaseio.com/todos.json')
        .then(res => {
            console.log('res: ', res);
            // and for example changing the state once request resolved...
        }); */
    // REM: 
    /**
     * - useEffect() hooks into the React internals and ensures that the code will be executed after rendering cycle (render())
     * - useEffect() runs after every render cycle, unlike componentDidMount(), thus it creates an infinite loop; with the code below, the render cycle is running at every state change and every state change causes a render cycle
     *      - to prevent infinite loop, use the 2nd argument that passes to useEffect(), of which only the change of its value will re-execute the callback (1st argument)
     *      - pass en empty array to execute the callback (1st argument) only once thus prevent infinite loop, since useEffect() has nothing compare with for re-execute the callback (1st argument) 
     */
    useEffect(() => {
        axios.get('https://react16-hooks.firebaseio.com/todos.json')
            .then(res => {
                console.log('res: ', res);
                // and for example changing the state once request resolved...
                const todoData = res.data;
                console.log('todoData: ', todoData);
                let todos = [];
                for(const k in todoData) {
                    console.log('k: ', k);
                    todos.push({id: k, name: todoData[k].name});
                }
                console.log('todos: ', todos);
                setTodoList(todos);
            });
    }, []); // REM: pass en empty array to execute the callback (1st argument) only once (as componentDidMount() in class-based) thus prevent infinite loop, since useEffect() has nothing compare with for re-execute the callback (1st argument) - as with componentDidMount() in class-based
    // }, [todoName]); // REM: for example: passing 'todoName' as 2nd argument, every change in the input field will cause an execution of the callback (1st argument) - as with componentDidMount() + componentDidUpdate() with an if check included in it

    const inputChangeHandler = (evt) => {
        // console.log('evt: ', evt.target.value);
        /* setTodoState({
            userInput: evt.target.value,
            todoList: todoState.todoList
        }); */
        setTodoName(evt.target.value);
        // inputState[1](evt.target.value);
    };

    const todoAddHandler = () => {
        /* setTodoState({
            userInput: todoState.userInput,
            todoList: todoState.todoList.concat(todoState.userInput)
        }); */
        setTodoList(todoList.concat(todoName)); // add new element (todoName) to the todoList state array

        axios.post('https://react16-hooks.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                console.log('res: ', res);

            })
            .catch(err => {
                console.log('err: ', err);

            });
    };

    return (
        // React.Fragment: allows top level siblings 
        <React.Fragment>
            {/* <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoState.userInput} /> */} {/* functional component */}
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} /> {/* functional component */}
            {/* <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={inputState[0]} /> */} {/* functional component */}
            {/* <input type="text" placeholder="Todo" onChange={this.inputUserHandler} value={this.state.todoValue} /> */} {/* class-based component */}
            <button type="button" onClick={todoAddHandler}>Add</button>
            <ul>
                {/* {todoState.todoList.map(todo => <li key={todo}>{todo}</li>)} */}
                {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    );
};

export default todo;