import React, { useEffect, useRef } from 'react';

export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, onClose = () => {} }) {
    const dialog = useRef();

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            dialog.current?.showModal();
        } else {
            document.body.style.overflow = '';
            dialog.current?.close();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <dialog
            className="z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent"
            ref={dialog}
            onKeyDown={handleKeyDown}
        >
            <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0">
                {show && (
                    <div className="fixed inset-0 transform transition-all" onClick={close}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                )}

                {show && (
                    <div
                        className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
                    >
                        {children}
                    </div>
                )}
            </div>
        </dialog>
    );
}
