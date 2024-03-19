import React, { useState, useEffect } from "react";
import axios from "axios";

const EleIssues = () => {
  const [lightFeed, setLightFeed] = useState([]);
  const [keys, setKeys] = useState([]);
  //   const [lat, setLat] = useState();
  //   const [long, setLong] = useState();
  // const mapUrl = https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3097.0099736745024!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU1JzQ1LjIiTiA4MMKwMTInMzMuOCJF!5e0!3m2!1sen!2sin!4v1706511264052!5m2!1sen!2sin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/adminData/getFeed",
          {
            selectedFeedValue: "streetlight outages",
          }
        );
        setLightFeed(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchKeys = async () => {
      try {
        const response = await axios.post("http://localhost:8080/getKey", {
          node: "feed",
          selectedFeedValue: "streetlight outages",
        });
        console.log(response.data);
        setKeys(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchKeys();
  }, []);

  return (
    <div className="Streetlight">
      <h2>Streetlight</h2>
      {lightFeed.map((item, index) => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3097.0099736745024!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU1JzQ1LjIiTiA4MMKwMTInMzMuOCJF!5e0!3m2!1sen!2sin!4v1706511264052!5m2!1sen!2sin`;
        return (
          <div className="issue" key={index}>
            <h1>{item.description}</h1>
            <p>{item.address}</p>
            <h4>{item.selectedValue}</h4>
            <p>{keys[index] ? keys[index][0] : ''}</p>
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

export default EleIssues;
