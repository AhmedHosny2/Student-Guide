const tost = (message, type, duration) => {
    let background;
    switch(type) {
        case 'error':
            background = 'linear-gradient(to right, #FF416C, #FF4B2B)';
            break;
        case 'success':
            background = 'linear-gradient(to right, #00b09b, #96c93d)';
            break;
        default:
            background = 'linear-gradient(to right, #4b6cb7, #182848)';
    }

    Toastify({
        text: message,
        duration,
        position: "center", // `left`, `center` or `right`
        // stopOnFocus: true, // Prevents dismissing of toast on hover
        // cloase
        close: true,
        style: {
            background: background,
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

// Example usage:
// tost("This is an error message", "error");
// tost("This is an info message", "info");
// tost("This is a success message", "success");

export { tost };