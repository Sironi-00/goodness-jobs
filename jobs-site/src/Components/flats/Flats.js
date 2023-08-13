import React, { useEffect, useState } from "react";
import { getFlats, deleteFlat } from "../../utils/apiFlats";
import { useNavigate } from "react-router-dom";
import Aside from "../aside.js/Aside";

function Flats() {
    const navigate = useNavigate();
    const [flatsArray, setFlats] = useState([]);

    const makeArr = async () => {
        setFlats(await getFlats());
    };

    useEffect(() => {
        makeArr();
    }, []);

    const handleClick = (id) => {
        navigate(`./${id}`);
    };
    const handleDelete = async (flat_code) => {
        const confirmation = window.confirm("Are you sure?");
        if (!confirmation) {
            return;
        }
        const res = await deleteFlat(flat_code);
        if (res) {
            makeArr();
        }
    };
    const asideArr = [
        {
            name: "New Flat",
            asideClickHandler: () => navigate("./new"),
        },
        {
            name: "New Job",
            asideClickHandler: () => navigate("/jobs/new"),
        },
        {
            name: "Sort ASC",
            asideClickHandler: () =>
                setFlats((prev) => {
                    return [
                        ...prev.toSorted((a, b) => {
                            if (a.flat_code < b.flat_code) return -1;
                            else return 1;
                        }),
                    ];
                }),
        },
        {
            name: "Sort DESC",
            asideClickHandler: () =>
                setFlats((prev) => {
                    return [
                        ...prev.toSorted((a, b) => {
                            if (a.flat_code < b.flat_code) return 1;
                            else return -1;
                        }),
                    ];
                }),
        },
    ];
    return (
        <>
            <Aside asideArr={asideArr} />
            <div className="scope">
                <div className="scope-head">
                    <h2>Flats</h2>
                    <p>Available: {flatsArray.length}</p>
                </div>
                <div className="container">
                    {flatsArray.map((flat) => {
                        const { flat_code, address } = flat;
                        return (
                            <div className="row flats" key={flat_code}>
                                <p>
                                    <span className="key-text">Flat Code:</span> {flat_code}{" "}
                                </p>
                                <p>
                                    <span className="key-text">Address: </span>
                                    {address}{" "}
                                </p>
                                
                                <input type="button" value="View Jobs" onClick={() => handleClick(flat_code)} />
                                <input type="button" value="Delete" onClick={() => handleDelete(flat_code)} />
                                
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Flats;
