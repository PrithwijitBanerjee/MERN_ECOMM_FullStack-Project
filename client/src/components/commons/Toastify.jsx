const Toastify = () => {
    return (
        <div
            id="toastNotification"
            className="toast d-flex align-items-center text-white bg-primary border-0 position-fixed"
            style={{ top: '20px', right: '20px', zIndex: 1055 }}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-body">
                Item is successfully added to your cart.
            </div>
            <button
                type="button"
                className="btn-close btn-close-white ms-auto me-2"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
        </div>
    );
};

export default Toastify;
