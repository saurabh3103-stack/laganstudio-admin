import React from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@/Components/Icon';

export default function Breadcrumbs({ items = [] }) {
    return (
        <nav className="flex items-center space-x-2 text-xs font-medium text-gray-400 select-none pb-1">
            <Link
                href="/dashboard"
                className="hover:text-gray-700 transition-colors"
            >
                Dashboard
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-300">/</span>
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-gray-700 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700 font-semibold">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
