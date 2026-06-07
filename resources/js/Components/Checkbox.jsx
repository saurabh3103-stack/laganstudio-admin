import React from 'react';

export default function Checkbox({ className = '', checked, onChange, ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
