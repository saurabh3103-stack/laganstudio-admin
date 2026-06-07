import React, { forwardRef, useEffect, useRef } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={input}
        />
    );
});

export default TextInput;
