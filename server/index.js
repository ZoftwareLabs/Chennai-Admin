// const express = require('express');
// const cors = require('cors');
// const authRoute = require("./routes/auth");
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/adminRoute.js";
import { getDatabase, ref, push, get, set, update, remove } from "firebase/database";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/adminData", adminRoute);



app.post("/getKey", async (req, res) => {
  const db = getDatabase();
  const refDB = req.body.node;
  const selectedFeedValue = req.body.selectedFeedValue;
  const DBRef = ref(db, refDB);
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      const keyValueArray = Object.entries(dataObject);

      const filteredArray = keyValueArray.filter(([key, value]) => {
        return value.selectedValue === selectedFeedValue;
      });

      if (filteredArray.length > 0) {
        res.status(200).json(filteredArray);
      } else {
        res.status(404).json({ message: 'No matching data available' });
      }
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.post("/updateAdminUsername", async (req, res) => {
//   try {
//     const { key, username } = req.body;
//     const feedData = await readAllData("feed");

//     if (feedData && feedData[key]) {
//       feedData[key].username = username; // Update adminusername field to username
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



// app.get("/api/getOfficerJobCount",async(req,res)=>{
// // ceo, vao, police
//   const db = req.body.username;
// })
// T O T A L   C O U N T S
app.get('/issuesByCategory', async (req, res) => {
  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  try {
    const snapshot = await get(DBRef);
    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let categoryCount = 0;

      Object.values(dataObject).forEach(value => {
        if (value.selectedValue === req.body.category) {
          categoryCount++;
        }
      });
      
      res.status(200).json(categoryCount);
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getProcessingCount', async (req, res) => {

  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let processingCount = 0;

      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'processing') {
          processingCount++;
        }
      });
      res.status(200).json(processingCount);
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getSolvedCount', async (req, res) => {

  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let solvedCount = 0;

      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'true') {
          solvedCount++;
        }
      });
      res.status(200).json(solvedCount);
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getNotSolvedCount', async (req, res) => {

  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let notSolvedCount = 0;

      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'false') {
          notSolvedCount++;
        }
      });
      res.status(200).json(notSolvedCount);
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// C A T E G O R Y   BASED COUNTS

app.post('/getProcessingCountByCategory', async (req, res) => {
  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let processingCountForCategory = 0;

      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'processing') {
          // processingCount++;
          if (value.selectedValue === req.body.category) {
            processingCountForCategory++;
          }
        }
      });
      res.status(200).json(
        processingCountForCategory
      );
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/getSolvedCountByCategory', async (req, res) => {
  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let solvedCountForCategory = 0;

      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'true') {
          if (value.selectedValue === req.body.category) {
            solvedCountForCategory++;
          }
        }
      });
      res.status(200).json(
        solvedCountForCategory
      );
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/getNotSolvedCountByCategory', async (req, res) => {
  const db = getDatabase();
  const DBRef = ref(db, 'feed');
  
  try {
    const snapshot = await get(DBRef);

    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      let notSolvedCountForCategory = 0;
      Object.entries(dataObject).forEach(([key, value]) => {
        if (value.solved === 'false') {
          if (value.selectedValue === req.body.category) {
            notSolvedCountForCategory++;
          }
        }
      });
      res.status(200).json(
        notSolvedCountForCategory
      );
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.post("/getKey", async (req, res) => {
//   const db = getDatabase();
//   const refDB = req.body.node;
//   const selectedFeedValue = req.body.selectedFeedValue;
//   const DBRef = ref(db, refDB);
//   try {
//     const snapshot = await get(DBRef);

//     if (snapshot.exists()) {
//       const dataObject = snapshot.val();
//       const keyValueArray = Object.entries(dataObject);

//       const filteredArray = keyValueArray.filter(([key, value]) => {
//         return value.selectedValue === selectedFeedValue;
//       });

//       if (filteredArray.length > 0) {
//         res.status(200).json(filteredArray);
//       } else {
//         res.status(404).json({ message: 'No matching data available' });
//       }
//     } else {
//       res.status(404).json({ message: 'No data available' });
//     }
//   } catch (error) {
//     console.error("Error getting data:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


app.listen(8080, () => {
  console.log("Server started at port 8080");
});
