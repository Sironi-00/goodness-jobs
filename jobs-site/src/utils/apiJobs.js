import BASE_URL from "./BASE_URL";

const getJobs = async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const getJobByRecord = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const createJob = async ({flat_code, record_no, date_vacant, date_deadline, instructor, details}) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "flat_code": flat_code,
            "record_no": record_no,
            "date_vacant": date_vacant,
            "date_deadline": date_deadline, 
            "instructor": instructor,
            "details": details
           })
    };
    const response = await fetch(`${BASE_URL}/jobs`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};

const updateJob = async ({record_no ,selector, value}) => {
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
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`, requestBody);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
};

const updateJobComplete = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}/done`, {method: "PATCH"});
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}; 

const deleteJob = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`, {method: "DELETE"});
    if (response.ok) {
        return true;
    }
}

export {
    getJobs,
    getJobByRecord,
    createJob,
    updateJob,
    updateJobComplete,
    deleteJob
};