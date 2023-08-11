import BASE_URL from "./BASE_URL";

const getUserByUsername = async ({ username, password }) => {
    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const createUser = async ({ username, password, group }) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            memberof: group,
        }),
    };
    const response = await fetch(`${BASE_URL}/user/new`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};

const updateUser = async ({ selector, value }) => {
    const requestBody = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            key: selector,
            value: value,
        }),
    };
    const response = await fetch(`${BASE_URL}/users`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const deleteUser = async (name) => {
    const response = await fetch(`${BASE_URL}/user/${name}`, { method: "DELETE" });
    if (response.ok) {
        return true;
    }
};

const logout = async () => {
    const response = await fetch(`${BASE_URL}/user/logout`);
    if (response.ok) {
        return true;
    }
}

export { getUserByUsername, createUser, updateUser, deleteUser, logout };
