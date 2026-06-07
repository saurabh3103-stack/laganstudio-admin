export const toast = {
    show: (message, type = 'success') => {
        const event = new CustomEvent('show-toast', { detail: { message, type } });
        window.dispatchEvent(event);
    },
    success: (message) => toast.show(message, 'success'),
    error: (message) => toast.show(message, 'error'),
    info: (message) => toast.show(message, 'info'),
    warning: (message) => toast.show(message, 'warning'),
};
