// oath privileges check
const isAuthenticated = (request, response, next) => {
    //console.log("Checking auth");
    if (request.session.authenticated) {
        next();
        return;
    } else {
        return response.redirect(403,'/login');
    }
}

const checkRole = (request, response, next) => {
    // check if user.active && user.memeberof
}

module.exports = {
    isAuthenticated,
    checkRole
}