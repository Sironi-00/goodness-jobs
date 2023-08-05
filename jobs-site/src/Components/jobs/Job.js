import React, { useEffect, useState } from "react";
import { getJobByRecord, deleteJob, updateJobComplete } from "../../utils/apiJobs";
import { useParams } from "react-router-dom";
import Aside from "../aside.js/Aside";
import UpdateJob from "./updateJob";

function Jobs({ jobObj = {}, handleView, reRender = null }) {
    const { recordId } = useParams();
    const [job, setJob] = useState({ loaded: false });
    const makeState = async () => {
        setJob({ ...jobObj, loaded: true });
    }
    const makeEle = async () => {
        if (recordId) {
            return setJob({ ...await getJobByRecord(recordId), loaded: true });
        }
    };
    const [toggleUpdate, setToggleUpdate] = useState(false);
    useEffect(() => {
        makeState();
    }, []);

    const handleDone = async (record_no) => {
        const confirmation = window.confirm("Are you sure?");
        if (!confirmation) {
            return;
        }
        const res = await updateJobComplete(record_no);
        if (res) {
            if (recordId) {
                makeState();
            } else {
                reRender();
            }
        }
    };

    const handleDelete = async (record_no) => {
        const confirmation = window.confirm("Are you sure?");
        if (!confirmation) {
            return;
        }
        const res = await deleteJob(record_no);
        if (res) {
            if (recordId) {
                makeState();
            } else {
                reRender();
            }
        }
    };

    return (
        <>
        {console.log("#")}
            {recordId ? <Aside /> : null}
            <div className={recordId ? "scope full" : "row job"} key={job.record_no}>
                <p>
                    <span className="key-text">Flat Code:</span> {job.flat_code}
                </p>
                <p>
                    <span className="key-text">Record_no:</span> {job.record_no}
                </p>
                <p>
                    <span className="key-text">Instructor:</span> {job.instructor}
                </p>
                <p>
                    <span className="key-text">Processed:</span> {job.processed ? "Yes" : "No"}
                </p>
                <p>
                    <span className="key-text">Cleaned:</span> {job.cleaned ? "Yes" : "No"}
                </p>
                <p>
                    <span className="key-text">Date Vacant:</span> {new Date(job.date_vacant).toDateString()}
                </p>
                <p>
                    <span className="key-text">Date Deadline:</span> {new Date(job.date_deadline).toDateString()}
                </p>
                <p>
                    <span className="key-text">Details:</span> {job.details}
                </p>

                <div className="buttons">
                    <input type="button" value="Cleaned" onClick={() => handleDone(job.record_no)} />
                    {recordId ? "" : <input type="button" value="View" onClick={() => handleView(job.record_no)} />}
                    {recordId ? (
                        <input type="button" value="Update" onClick={() => setToggleUpdate((prev) => !prev)} />
                    ) : (
                        ""
                    )}
                    <input type="button" value="Delete" onClick={() => handleDelete(job.record_no)} />
                </div>
                {toggleUpdate ? <UpdateJob record_no={job.record_no} selectorArray={Object.keys(job)} /> : ""}
            </div>
        </>
    );
}

export default Jobs;
