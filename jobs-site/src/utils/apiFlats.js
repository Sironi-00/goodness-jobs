import BASE_URL from './BASE_URL.js';
const getFlats = async () => {
    try {
    const response = await fetch(`${BASE_URL}/flats`, {
        method: "GET",
        credentials: "include",
    } );
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
} catch (err) {
    console.log(err)
    return []
}
};

const getJobsByFlat = async (id) => {
    const response = await fetch(`${BASE_URL}/flats/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        return []
    }
};

const searchByAddress = async (term) => {
    const response = await fetch(`${BASE_URL}/flats?search=${term}`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
}

const createFlat = async (new_code, address) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            flat_code: new_code,
            address: address
        })
    };
    const response = await fetch(`${BASE_URL}/flats`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const deleteFlat = async (id) => {
    const response = await fetch(`${BASE_URL}/flats/${id}`, {method: "DELETE"});
    if (response.ok) {
        return true;
    }
};

export {
    getFlats,
    getJobsByFlat,
    searchByAddress,
    createFlat,
    deleteFlat
};