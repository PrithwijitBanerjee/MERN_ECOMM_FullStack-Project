
exports.errorResponseHandler = (res, { status = 500, message = "Internal Server Error !!!" }) => {
    return res.status(status).json({
        success: false,
        message
    });
};

exports.successResponseHandler = (res, { status = 200, message = "Successfull Response", payload = {} }) => {
    return res.status(status).json({
        success: true,
        message,
        payload
    });
};