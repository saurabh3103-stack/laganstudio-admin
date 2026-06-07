import React from 'react';
import { Link } from '@inertiajs/react';

export default function DropdownLink({ href, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            href={href}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
}
