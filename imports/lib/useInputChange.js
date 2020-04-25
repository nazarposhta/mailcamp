import { useState } from 'react';

const useInputChange = () => {
    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    });

    return [input, handleInputChange];
}

const useCheckboxChange = (initState={}) => {
    const [input, setInput] = useState(initState);
    const handleCheckboxChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.checked
    });
    const checkbox = input;
    return [checkbox, handleCheckboxChange];
}

export { useInputChange, useCheckboxChange };
