// oath privileges check
const isAuthenticate = (request, response, next) => {
    if (request.session.authenticated) {
        next();
        return;
    } else {
        return response.redirect(403,'/login');

    }
}

const checkRole = () => {
    // check if user.active && user.memeberof
}

module.exports = {
    isAuthenticate,
    checkRole
}