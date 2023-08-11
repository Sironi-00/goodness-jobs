import './Home.css';
import React from "react";
import Aside from "../aside.js/Aside";

function Home({recordId}) {
  return (
    <>
    <Aside />
    <div className="scope">
    <h1>Homepage</h1>
    <p>This is a Full-Stack web app designed for track Flats/Jobs and invoicing </p>
    <article>
      <h2>Flats</h2>
      <p>List all flats in the Database (flat_code & address) </p>
      <br />
      <p>View jobs on flat allows access to all jobs for specific flat_code</p>
      <p>A flat can also be delete from the database</p>
      <p>If desired flat is not available a new flat can be created</p>
      <p>New Job can also be created from here</p>
      <p>Sorting: currently can only sort by flat_code Ascending and Descending </p>
    </article>
    <article>
      <h2>Jobs</h2>
      <p>List all jobs in the Database, by default, cleaned jobs are hidden </p>
      <br />
      <p>Clicking the cleaned button creates an entry in Cleaned Database with a record of current time</p>
      <p>...</p>
    </article>
    <article>
      <h2>Cleaned</h2>
      <p>List all completed jobs </p>
      <p>On Invoicing the the date is updated</p>
      <p>...</p>
    </article>
    </div>
    </>
  );
}

export default Home;
