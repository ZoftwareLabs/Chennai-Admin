import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, set, update, remove } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

//  A L L   C O M M E N T S     A R E   W O R K I N G !  THOTTUDAATHA

const firebaseConfig = {
  apiKey: "AIzaSyDgqMaMFxTxpnlGjZ64if-GMqsEb2R_8W0",
  authDomain: "cityapp-5a6b5.firebaseapp.com",
  databaseURL: "https://cityapp-5a6b5-default-rtdb.firebaseio.com",
  projectId: "cityapp-5a6b5",
  storageBucket: "cityapp-5a6b5.appspot.com",
  messagingSenderId: "645444337466",
  appId: "1:645444337466:web:236685b5f0c6251bf31a03",
  measurementId: "G-C1V62M0QK8"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
// const analytics = getAnalytics(app);

const adminRef = ref(db, 'feed');
// create seperate ref for each node there

// get(adminRef).then((snapshot) => {
//   if (snapshot.exists()) {
//     // console.log(snapshot.val());
//     const dataObject = snapshot.val();

//     const keyValueArray = Object.entries(dataObject);
//     console.log(keyValueArray);
//     // console.log(keyValueArray[0][0]);

//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error("Error getting data:", error);
// });

// C R E A T E Operation
const createData = async (node, data) => {
    const newDataRef = push(ref(db, node));
    await set(newDataRef, data);
    return newDataRef.key;
  };
  
  // R E A D Operation
  const readAllData = async (node) => {
    const dataRef = ref(db, node);
    const snapshot = await get(dataRef);
  
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };
  
  // R E A D O N E Operation
  const readOneData = async (node, id) => {
    // const dataRef = child(ref(db, node), id);
    const dataRef = ref(db, `${node}/${id}`);
    const snapshot = await get(dataRef);
  
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };
  
  // U P D A T E Operation
  const updateData = async (node, id, newData) => {
    // const dataRef = child(ref(db, node), id);
    const dataRef = ref(db, `${node}/${id}`);
    await update(dataRef, newData);
    return true;
  };
  
  // D E L E T E Operation
  const deleteData = async (node, id) => {
    // const dataRef = child(ref(db, node), id);
    const dataRef = ref(db, `${node}/${id}`);
    await remove(dataRef);
    return true;
  };

// N E W    N O D E 

//   const newNodeRef = push(ref(db, 'yourNodeName')); // Replace 'yourNodeName' with the desired node name

//   const newData = {
//     key1: 'value1',
//     key2: 'value2',
//   };
//   const try1 = {
//     email: 'try1@example.com',
//     firstName: 'John',
//     lastName: 'Doe',
//     profileImage: 'https://example.com/profile-image.jpg'
//   };
//   set(newNodeRef, try1)
//     .then(() => {
//       console.log('New node created and data added successfully.');
//     })
//     .catch((error) => {
//       console.error('Error creating node and adding data:', error);
//     });


  // readOneData('feed', '-NpJ4vgJi42NMnVZ3zA-')
  // .then(oneData => {
  //   console.log(oneData);
  // })
  // .catch(error => {
  //   console.error('Error reading data:', error);
  // });

  // readAllData('adminpoints')
  // .then(adminData => {
  //   console.log(adminData);
  // })
  // .catch(error => {
  //   console.error('Error reading data:', error);
  // });
  
  // readAllData('adminpoints')
  // .then(adminData => {
  //   // Extract usernames from the adminData object
  //   const usernames = Object.values(adminData).map(item => item.username);
    
  //   console.log(usernames);
  // })
  // .catch(error => {
  //   console.error('Error reading data:', error);
  // });

export { createData, readAllData, readOneData, updateData, deleteData };