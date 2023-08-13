import React, { useState } from "react";
import { updateJob } from "../../utils/apiJobs";

function UpdateJob({record_no , selectorArray = [], reRender, setToggleUpdate}) {
    const [selectorState, setSelectorState] = useState("");
    const [valueState, setValueState] = useState("");

    const handleUpdateSubmit = async (e, record_no, selector, value) => {
        e.preventDefault();
        const res = await updateJob({record_no, selector, value});
        if (res) {
          setToggleUpdate(prev => !prev);
          reRender();
        }
    }
    return (
    <>
      <form onSubmit={(e) => handleUpdateSubmit(e, record_no, selectorState, valueState)}>
        <select onChange={({target})=> setSelectorState(prev => target.value)}>
            {
                selectorArray.map(selector => {
                return <option key={selector} value={selector} >{selector}</option>
            })
            }
        </select>
        <input type="value" value={valueState} placeholder="value" onChange={({target}) => setValueState(prev => target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default UpdateJob;
