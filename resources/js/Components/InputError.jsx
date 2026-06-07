import React from 'react';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <div {...props} className={className}>
            <p className="text-sm text-red-600">{message}</p>
        </div>
    ) : null;
}
