import BASE_URL from "./BASE_URL";

const getUserByUsername = async ({username, password}) => {
    try {
    const response = await fetch(`${BASE_URL}/user`, {
        method: "GET",
        credentials: "include",
        body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    } } catch (err) {
        console.log(err);
        return [];
    }
};

const createUser = async (newUser) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newUser)
    };
    const response = await fetch(`${BASE_URL}/user`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};

const updateUser = async ({selector, value}) => {
    const requestBody = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "key": selector,
            "value": value
           })
    };
    const response = await fetch(`${BASE_URL}/users`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};


const deleteUser = async (username) => {
    const response = await fetch(`${BASE_URL}/user/${username}`, {method: "DELETE"});
    if (response.ok) {
        return true;
    }
}

export {
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};