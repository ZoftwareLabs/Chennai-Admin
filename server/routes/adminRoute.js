import { Router } from "express";
import { readAllData } from "../fb_config.mjs";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  get,
  set,
  update,
  remove,
} from "firebase/database";

const router = Router();


router.post("/getFeed", async (req, res) => {
  try {
    const { selectedFeedValue } = req.body;
    const feedData = await readAllData("feed");

    const selectedFeed = [];

    for (const key in feedData) {
      if (feedData[key].selectedValue === selectedFeedValue) {
        const response = feedData[key];
        selectedFeed.push(response);
      }
    }

    // if (selectedFeed.length > 0) {
      res.status(200).json(selectedFeed);
    // } else {
      // console.log(No data found for selectedFeedValue: ${selectedFeedValue});
      // res.status(404).json({ message: "Data not found" });
    // }
  } catch (error) {
    console.error("Error getting feed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/updateAdminUsername", async (req, res) => {
//   try {
//     const { key, username } = req.body;
//     const feedData = await readAllData("feed");

//     if (feedData && feedData[key]) {
//       feedData[key].adminusername = username; // Update adminusername field to username
//       // Update the adminusername in your database here if necessary
//       // Example: await updateAdminUsernameInDatabase(key, username);
//       res.status(200).json({ message: 'Username updated successfully', updatedFeed: feedData[key] });
//     } else {
//       res.status(404).json({ message: 'Key not found in feed or feed data not available' });
//     }
//   } catch (error) {
//     console.error("Error updating username:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

router.post("/updateAdminUsername", async (req, res) => {
  try {
    const { key, username } = req.body;
    const feedData = await readAllData("feed");

    if (feedData && feedData[key]) {
      feedData[key].adminusername = username; // Update adminusername field to username
      await setFeedData(feedData); // Save updated feedData to the database
      res.status(200).json({ message: 'Username updated successfully', updatedFeed: feedData[key] });
    } else {
      res.status(404).json({ message: 'Key not found in feed or feed data not available' });
    }
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function setFeedData(feedData) {
  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  await set(DBRef, feedData);
}



// const firebaseConfig = {
//     apiKey: "AIzaSyDgqMaMFxTxpnlGjZ64if-GMqsEb2R_8W0",
//     authDomain: "cityapp-5a6b5.firebaseapp.com",
//     databaseURL: "https://cityapp-5a6b5-default-rtdb.firebaseio.com",
//     projectId: "cityapp-5a6b5",
//     storageBucket: "cityapp-5a6b5.appspot.com",
//     messagingSenderId: "645444337466",
//     appId: "1:645444337466:web:236685b5f0c6251bf31a03",
//     measurementId: "G-C1V62M0QK8"
//   };

//   const app = initializeApp(firebaseConfig);
//   const db = getDatabase();
//   const adminRef = ref(db, 'adminpoints');

router.post("/getPoints", async (req, res) => {
  try {
    const { username } = req.body;
    const adminData = await readAllData("adminpoints");

    for (const key in adminData) {
      if (adminData[key].username === username) {
        const points = adminData[key].points;
        console.log(`Points for ${username}: ${points}`);
        res.status(200).json({ points });
        return;
      }
    }

    console.log(`No data found for ${username}`);
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Error getting points:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/getFeed", async (req, res) => {
  try {
    const { selectedFeedValue } = req.body;
    const feedData = await readAllData("feed");

    const selectedFeed = [];

    for (const key in feedData) {
      if (feedData[key].selectedValue === selectedFeedValue) {
        const response = feedData[key];
        selectedFeed.push(response);
      }
    }

    // if (selectedFeed.length > 0) {
      res.status(200).json(selectedFeed);
    // } else {
      // console.log(`No data found for selectedFeedValue: ${selectedFeedValue}`);
      // res.status(404).json({ message: "Data not found" });
    // }
  } catch (error) {
    console.error("Error getting feed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// router.post("/myJobs", async(req,res)=>{
//   const username = req.body.username;
//   readAllData('feed')
//   .then(adminJobs => {
//     res.status(200).json(adminJobs)
//     // console.log(adminJobs);
//   })
//   .catch(error => {
//     console.error('Error reading data:', error);
//   });
// })
// router.put("/takeJob",async (req,res)=>{
//   const adminusername=req.body.username;
//   const key=req.body.key;
// });


// router.post("/myJobs", async(req, res) => {
//   const username = req.body.username;

//   try {
//     const adminJobs = await readAllData('feed');
//     const adminJobsArray = Object.entries(adminJobs);

//     const filteredAdminJobs = adminJobsArray.filter(([key, value]) => value.adminusername === username);

//     const filteredAdminJobsObject = Object.fromEntries(filteredAdminJobs);

//     res.status(200).json(filteredAdminJobsObject);
//   } catch (error) {
//     console.error('Error reading data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post("/myJobs", async(req, res) => {
  const username = req.body.username;

  try {
    const adminJobs = await readAllData('feed');
    const adminJobsArray = Object.entries(adminJobs);

    // Filter admin jobs based on adminusername
    const filteredAdminJobs = adminJobsArray.filter(([key, value]) => value.adminusername === username);

    // Extract job details from filtered jobs
    const jobsArray = filteredAdminJobs.map(([key, value]) => ({ ...value, jobId: key }));

    // Send the filtered jobs as response
    res.status(200).json(jobsArray);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
