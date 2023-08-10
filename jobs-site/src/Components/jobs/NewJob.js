import React, { useState, useEffect } from "react";
import { createJob } from "../../utils/apiJobs";
import { getFlats } from "../../utils/apiFlats"; 
import Aside from "../aside.js/Aside";
import { useNavigate } from "react-router-dom";

function NewJob() {
  const navigate = useNavigate();
  const [newJob, setJob] = useState({
    flat_code: 0,
    record_no: 0,
    date_vacant: false,
    date_deadline: false,
    instructor: "",
    details: "",
  });
    const [flat_codeArr, setCodesArr] = useState(["Loading"]);
    const makeFlatCode = async () => {
      let data = await getFlats();
      setCodesArr(data.map((flat) => flat.flat_code));
    };
    useEffect(() => {
      makeFlatCode()
    }, []);

  const setFlatCode = ({ target }) => {
    setJob(prev => ({ ...prev, flat_code: Number(target.value) }));
  };
  const setRecordNo = ({ target }) => {
    setJob(prev => ({ ...prev, record_no: Number(target.value) }));
  };
  const setDateVacant = ({ target }) => {
    setJob({ ...newJob, date_vacant: target.value });
  };
  const setDateDeadline = ({ target }) => {
    setJob(prev => ({ ...prev, date_deadline: target.value }));
  };
  const setInstructor = ({ target }) => {
    setJob(prev => ({ ...prev, instructor: target.value }));
  };
  const setDetails = ({ target }) => {
    setJob(prev => ({ ...prev, details: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createJob(newJob);
    if (res) {
      // navigate(`/jobs/${newJob.record_no}`);
      navigate(`/jobs`);
    } else {
      alert("make sure flat_code exists")
    }
  };
  return (
    <>
    <Aside />
      <div className="scope">
        <div className="scope-head">
          <h2>New Job</h2>
        </div>
        <div className="row">
          <form>
            <label htmlFor="flat_code">
              Flat Code:
              <select onChange={setFlatCode}>
                {flat_codeArr.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>
            </label>
            <label htmlFor="address">
              Record No:
              <input type="number" value={newJob.record_no} placeholder="Address" required onChange={setRecordNo} />
            </label>
            <label htmlFor="flat_code">
              Date Vacant:
              <input type="date" value={newJob.date_vacant} onChange={setDateVacant} />
            </label>
            <label htmlFor="address">
              Date Deadline:
              <input type="date" value={newJob.date_deadline} onChange={setDateDeadline} />
            </label>
            <label htmlFor="instructor">
              Instructor:
              <input type="text" value={newJob.instructor} placeholder="Name" onChange={setInstructor} />
            </label>
            <label htmlFor="address">
              Details:
              <input type="text" value={newJob.details} placeholder="Clean type" onChange={setDetails} />
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </>
  );
}

export default NewJob;
