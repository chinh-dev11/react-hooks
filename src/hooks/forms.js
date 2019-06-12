// REM: same rules apply to custom hooks as for React hooks
/**
 * 	- Must be used/declared at the top of component function
	- Has to be in a component function, a function
		○ that takes 'props'
		○ that returns a JSX
		○ that React can use to render a component
		○ that can't be used in another function which also uses hooks (eg: a nested function that calls useState() inside)
	- Cannot be called in conditional statements as if/else, switch,... or any form of nesting (eg: for loop)
    - Needs to be called at the statement root (eg: const [todoName, setTodoName] = useState('');)
 */

import { useState } from 'react';

export const useFormInput = () => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = (evt) => {
        setValue(evt.target.value);

        if (evt.target.value.trim() === '') {
            setValidity(false);
        } else {
            setValidity(true);
        }
    };

    return {
        value: value,
        onChange: inputChangeHandler,
        // validity: validity // OR
        validity
    };
};