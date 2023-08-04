import "./jobs.css";
import React, { useEffect, useState } from "react";
import { getJobs } from "../../utils/apiJobs";
import { getJobsByFlat } from "../../utils/apiFlats";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Aside from "../aside.js/Aside";
import Job from "./Job";

function Jobs() {
    const navigate = useNavigate();
    const [jobsArray, setJobs] = useState([]);
    const [filterState, setFilter] = useState(false);
    const { code } = useParams();

    const makeArr = async () => {
        let data = await getJobs();
        if (code) {
            data = data.filter(job => job.flat_code === code)
            // setJobs(await getJobsByFlat(code));
        }
        setJobs(data);
    };
    useEffect(() => {
        makeArr();
    }, []);

    const handleView = (id) => {
        navigate(`/jobs/${id}`);
    };

    const asideArr = [
        {
            name: "New Job",
            asideClickHandler: () => navigate("/jobs/new"),
        },
        {
            name: "Sort by date",
            asideClickHandler: () => {
                setJobs((prev) =>
                    prev.toSorted((a, b) => {
                        if (a.date_vacant > b.date_vacant) return 1;
                        else return -1;
                    })
                );
            },
        },
        {
            name: "Show All",
            asideClickHandler: () => setFilter("*"),
        },
        {
            name: "Toggle Show",
            asideClickHandler: () =>
                setFilter((prev) => {
                    return prev === "*" ? false : prev === false ? true : false;
                }),
        },
    ];
    return (
        <>
            <Aside array={asideArr} />
            <div className="scope">
                <div className="scope-head">
                    <h2>Jobs</h2>
                    <p>Available: {jobsArray.length}</p>
                </div>
                <div className="container">
                    {jobsArray.map((job) => {
                        if (filterState === "*" || filterState === job.cleaned) {
                            return <Job key={job.record_no} jobObj={job} handleView={handleView} reRender={makeArr} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
}

export default Jobs;
