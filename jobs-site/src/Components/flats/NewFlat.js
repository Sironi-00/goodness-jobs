import "./Flats.css";
import React, { useEffect, useState } from "react";
import { createFlat } from "../../utils/apiFlats";
import Aside from "../aside.js/Aside";
import { useNavigate } from "react-router-dom";

function NewFlats() {
    const navigate = useNavigate();
    const [flatCode, setFlatCode] = useState();
    const handleCodeChange = ({ target }) => {
        setFlatCode(Number(target.value));
    };
    const [flatAddress, setFlatAddress] = useState("");
    const handleAddressChange = ({ target }) => {
        setFlatAddress(target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createFlat(flatCode, flatAddress);
        if (res) {
            navigate("/flats");
        }
    };
    return (
        <>
            <Aside />
            <div className="scope">
                <div className="scope-head">
                    <h2>New Flats</h2>
                </div>
                <div className="row">
                    <form>
                        <label htmlFor="flat_code">Flat Code:</label>
                        <input
                            id="flat_code"
                            type="number"
                            value={flatCode}
                            placeholder="Flat code"
                            min="1"
                            required
                            onChange={handleCodeChange}
                        />
                        <label htmlFor="address">Address:</label>
                        <input
                            id="address"
                            type="text"
                            value={flatAddress}
                            placeholder="Address"
                            onChange={handleAddressChange}
                        />
                        <input type="submit" value="Submit" onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewFlats;
