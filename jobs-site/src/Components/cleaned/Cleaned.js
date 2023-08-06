import React, { useEffect, useState } from "react";
import { getCleaned, updateCleanedInvoiced } from "../../utils/apiCleaned";
import Aside from "../aside.js/Aside";
import { useNavigate } from "react-router-dom";

function Cleaned() {
  const navigate = useNavigate();
  const [cleanedArray, setCleaned] = useState([]);
  const makeArr = async () => setCleaned(await getCleaned());
  
  useEffect(() => {
    makeArr();
  }, []);
  const handleClick = (record_no) => {
    navigate(`/jobs/${record_no}`)
  };
  const toggleInvoiced = async (record_no) => {
      const confirmation = window.confirm("Are you sure?");
      if (!confirmation) {
          return;
      }
      const res = await updateCleanedInvoiced(record_no);
      if (res) {
          makeArr();
      }
  };

  return (
    <>
      <Aside />
      <div className="scope">
        <div className="scope-head">
        <h2>Cleaned</h2>
        <p>Count: {cleanedArray.length}</p>
        </div>
        <div className="container">
          {cleanedArray.map((flat) => {
            const { flat_code, record_no, date_cleaned, invoiced, date_invoiced } = flat;
            return (
              <div className="row cleaned" key={record_no}>
                <p><span className="key-text">Flat Code:</span> {flat_code} </p>
                <p><span className="key-text">Record No.:</span> {record_no} </p>
                <p><span className="key-text">Date cleaned:</span> {new Date(date_cleaned).toDateString()} </p>
                <p><span className="key-text">Invoiced:</span> 
                <input type="checkbox" checked={invoiced} onChange={() => toggleInvoiced(record_no)} />
                </p>
                <p><span className="key-text">Date Invoiced:</span> {date_invoiced ? new Date(date_invoiced).toDateString() : "-"} </p>
                <input type="button" value="view job" onClick={() => handleClick(record_no)} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cleaned;
