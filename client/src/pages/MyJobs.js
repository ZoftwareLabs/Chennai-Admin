// import React from 'react';

// const MyJobs = () => {
//     const username = localStorage.getItem('username');
//   return (
//     <div>
//       <h1>{username}</h1>
//     </div>
//   );
// }

// export default MyJobs;

import React, { useState, useEffect } from "react";
import axios from "axios";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/adminData/myJobs", {
          username: "ele",
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    // <div className="samm4">
    //   <h2>My Jobs</h2>
    //   <ul>
    //     {jobs.map((job, index) => (
    //       <li key={index}>
    //         <h3>{job.title}</h3>
    //         <p>{job.description}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="Streetlight">
      <h2>Streetlight</h2>
      {jobs.map((item, index) => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3097.0099736745024!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU1JzQ1LjIiTiA4MMKwMTInMzMuOCJF!5e0!3m2!1sen!2sin!4v1706511264052!5m2!1sen!2sin`;
        return (
          <div className="issue" key={index}>
            <h1>{item.description}</h1>
            <p>{item.address}</p>
            <h4>{item.selectedValue}</h4>
            {/* <p>{keys[index] ? keys[index][0] : ''}</p> */}
            <img src={item.photoUrl} alt="" />
            <iframe
              className="embeddedMap"
              src={mapUrl}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <h4>{item.solved}</h4>
            <h4>{item.prediction}</h4>
            <div className="controls">
              <button className="accept">Accept</button>
              {item.prediction !== "verified" && <button className="reject">Reject</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyJobs;
