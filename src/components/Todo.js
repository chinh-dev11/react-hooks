/* eslint-disable react-hooks/exhaustive-deps */
// React Hook "useState" is called in function "todo" which is neither a React function component or a custom React Hook function.eslint(react-hooks/rules-of-hooks)
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect, useReducer } from 'react';
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

    // const [todoList, setTodoList] = useState([]); // commented out to use useReducer() instead
    // console.log('todoList: ', todoList);

    const [submittedTodo, setSubmittedTodo] = useState(null);

    // merging different states in one - NOT RECOMMENDED!!!
    // REM: the hook (setTodoState) does update but NOT MERGE the states therefore requires manual merging (as in todoAddHandler()), unlike setSate() in class-based component
    /* const [todoState, setTodoState] = useState({
        userInput: '',
        todoList: []
    }); */


    // REM: useReducer()
    /**
     * Reducer: allow to bundle the logic to updating the states in one simple function, independent to Redux, and more powerful than useState()
     * @param {*} state the latest state to add based on the action
     * @param {*} action an object with information about what to do
     * @return the latest state of the list (todoList), after action applied
     */
    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'SET':
                return action.payload;
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);
    console.log('todoList: ', todoList);


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
    // REM: useEffect()
    /**
     * - useEffect() hooks into the React internals and ensures that the code will be executed after rendering cycle (render())
     * - useEffect() 
     *      - runs after every render cycle, unlike componentDidMount(), thus it creates an infinite loop; with the code below, the render cycle is running at every state change and every state change causes a render cycle
     *      - to prevent infinite loop, use the 2nd argument that passes to useEffect(), of which only the change of its value will re-execute the callback (1st argument)
     *      - pass en empty array to execute the callback (1st argument) only once thus prevent infinite loop, since useEffect() has nothing compare with for re-execute the callback (1st argument) 
     *      - 1st argument (callback)
     *      - 2nd argument (input array)
     *          - [] (empty): effect (callback) will only activate once - mounting the component
     *          - [someInput]: effect (callback) will only activate if the values in the list change
     *          - no argument: effect (callback) will run for every render cycle
     */
    useEffect(() => {
        axios.get('https://react16-hooks.firebaseio.com/todos.json')
            .then(res => {
                // console.log('res: ', res);
                // and for example changing the state once request resolved...
                const todoData = res.data;
                // console.log('todoData: ', todoData);
                let todos = [];
                for (const k in todoData) {
                    // console.log('k: ', k);
                    todos.push({ id: k, name: todoData[k].name });
                }
                // console.log('todos: ', todos);
                // setTodoList(todos);// commented out to use useReducer() instead
                dispatch({ type: 'SET', payload: todos })
            })
            .catch(err => {
                console.log('err: ', err);
            });
    }, []); // REM: pass en empty array to execute the callback (1st argument) only once (as componentDidMount() in class-based) thus prevent infinite loop, since useEffect() has nothing compare with for re-execute the callback (1st argument) - as with componentDidMount() in class-based
    // }, [todoName]); // REM: for example: passing 'todoName' as 2nd argument, every change in the input field will cause an execution of the callback (1st argument) - as with componentDidMount() + componentDidUpdate() with an if check included in it
    // }; // REM: no 2nd argument: will run for every render cycle 

    const mouseMoveHandler = (evt) => {
        console.log('x: ', evt.clientX, ' y: ', evt.clientY);
    };
    useEffect(() => {
        console.log('effect - runs...');
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => { // REM: cleanup before effect (callback) activates (executes) - as componentDidUnmount()
            console.log('effect - cleanup...');
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    });

    // REM: using useEffect() and checking submittedTodo to prevent any lost of entries added in case of slow response (5s simulated) from the server
    useEffect(() => {
        if (submittedTodo) {
            // add new element (todoItem) to the todoList state array
            // setTodoList(todoList.concat(submittedTodo)); // commented out to use useReducer() instead 
            dispatch({ type: 'ADD', payload: submittedTodo });
        }
    }, [submittedTodo]);

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

        axios.post('https://react16-hooks.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                console.log('res: ', res);
                setTimeout(() => {
                    const todoItem = {
                        id: res.data.name,
                        name: todoName
                    };
                    // setTodoList(todoList.concat(todoItem)); // add new element (todoItem) to the todoList state array
                    // setSubmittedTodo(todoItem); // REM: adding item to submittedTodo state and then check submittedTodo in useEffect to ensure entries were added correctly without any entries lost due to simulated server latency
                    dispatch({ type: 'ADD', payload: todoItem }); // REM: useReducer() is much simpler, instead of useEffect() - submittedTodo, to ensure entries were added correctly without any entries lost due to simulated server latency, since reducer always takes the latest state snapshot
                }, 5000); // to simulate a longer response (5s) from the server, which will result in loosing entries that were added rapidly to the todoList

            })
            .catch(err => {
                console.log('err: ', err);
            });
    };

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://react16-hooks.firebaseio.com/todos/${todoId}.json`) // OR
            // axios.delete('https://react16-hooks.firebaseio.com/todos/' + todoId + '.json')
            .then(res => {
                console.log('res: ', res);
                dispatch({ type: 'REMOVE', payload: todoId });
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
                {/* {todoList.map(todo => <li key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>{todo.name}</li>)} */} {/** OR */}
                {todoList.map(todo => <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    );
};

export default todo;