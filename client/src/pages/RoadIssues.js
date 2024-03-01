import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Potholes = () => {
  const [potholeFeed, setPotholeFeed] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/adminData/getFeed', {
          selectedFeedValue: 'Pot Holes'
        });
        setPotholeFeed(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchKeys = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getKey', {
          node: 'feed',
          selectedFeedValue: 'Pot Holes'
        });
        setKeys(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchKeys();
  }, []);

  useEffect(() => {
    // Use keys in this block since it's guaranteed to be updated
    console.log(keys);
  }, [keys]);

  return (
    <div className="Streetlight">
      <h2>Pot Holes</h2>
      {potholeFeed.map((item, index) => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3097.0099736745024!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU1JzQ1LjIiTiA4MMKwMTInMzMuOCJF!5e0!3m2!1sen!2sin!4v1706511264052!5m2!1sen!2sin`;

        return (
          <div className="issue" key={index}>
            <h1>{item.description}</h1>
            <p>{item.address}</p>
            {/* Access keys safely */}
            <p>{keys[index] ? keys[index][0] : ''}</p>
            <img src={item.photoUrl} alt="" />
            <iframe
              className="embeddedMap"
              src={mapUrl}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="async"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="controls">
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Potholes;