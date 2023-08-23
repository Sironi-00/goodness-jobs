const setSessionUser = (user = null) => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    return user;
}

const getSessionUser = () => {
    const localUser = window.sessionStorage.getItem("user");
    if (localUser) {
        return JSON.parse(localUser);
    } else {
        return null;
    }
}


export {
    getSessionUser,
    setSessionUser,
};