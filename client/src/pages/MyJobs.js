import React from 'react';

const MyJobs = () => {
    const username = localStorage.getItem('username');
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export default MyJobs;
