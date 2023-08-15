import BASE_URL from "./BASE_URL.js";
import { apiResponse } from "./api.js";

const getFlats = async () => {
    try {
        const response = await fetch(`${BASE_URL}/flats`, {
            method: "GET",
            credentials: "include",
        });
        return await apiResponse(response);
    } catch (err) {
        console.log(err);
        return [];
    }
};

const getJobsByFlat = async (id) => {
    const response = await fetch(`${BASE_URL}/flats/${id}`);
    return await apiResponse(response);
};

const searchByAddress = async (term) => {
    const response = await fetch(`${BASE_URL}/flats?search=${term}`);
    return await apiResponse(response);
};

const createFlat = async (new_code, address) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            flat_code: new_code,
            address: address,
        }),
    };
    const response = await fetch(`${BASE_URL}/flats`, requestBody);
    return await apiResponse(response);
};

const deleteFlat = async (id) => {
    const response = await fetch(`${BASE_URL}/flats/${id}`, { method: "DELETE" });
    if (response.ok) {
        return true;
    }
};

export { getFlats, getJobsByFlat, searchByAddress, createFlat, deleteFlat };
