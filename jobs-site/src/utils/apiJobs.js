import BASE_URL from "./BASE_URL";
import { apiResponse } from "./api";


const getJobs = async () => {
    try {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: "GET",
            credentials: "include",
        });
        return await apiResponse(response);
    } catch (err) {
        console.log(err);
        return [];
    }
};

const getJobByRecord = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`);
    return await apiResponse(response);
};

const createJob = async ({ flat_code, record_no, date_vacant, date_deadline, instructor, details }) => {
    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            flat_code: flat_code,
            record_no: record_no,
            date_vacant: date_vacant,
            date_deadline: date_deadline,
            instructor: instructor,
            details: details,
        }),
    };
    const response = await fetch(`${BASE_URL}/jobs`, requestBody);
    return await apiResponse(response);
};

const updateJob = async ({ record_no, selector, value }) => {
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
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`, requestBody);
    return await apiResponse(response);
};

const updateJobComplete = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}/done`, { method: "PATCH" });
    if (response.ok) {
        return true;
    }
};

const deleteJob = async (record_no) => {
    const response = await fetch(`${BASE_URL}/jobs/${record_no}`, { method: "DELETE" });
    if (response.ok) {
        return true;
    }
};

export { getJobs, getJobByRecord, createJob, updateJob, updateJobComplete, deleteJob };
