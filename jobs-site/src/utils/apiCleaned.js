import BASE_URL from "./BASE_URL";

const getCleaned = async () => {
    const response = await fetch(`${BASE_URL}/completed`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const updateCleanedInvoiced = async (record_no) => {
    const response = await fetch(`${BASE_URL}/completed/${record_no}/invoiced`, {method: "PATCH"});
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

export { getCleaned, updateCleanedInvoiced };
