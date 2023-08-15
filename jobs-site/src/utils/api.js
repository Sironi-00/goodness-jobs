const apiResponse = async (response) => {
    if (response.status === 403) {
        console.log(response);
    }
    if (response.ok) {
        return await response.json();
    } else{
        console.log(response);
        return [];
    } 
}

export {
    apiResponse
}