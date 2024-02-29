import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';

const Dashboard = () => {
  const [totalData, setTotalData] = useState({});
  const [waterCategoryData, setWaterCategoryData] = useState({})
  const [totalIssuesCount, setTotalIssuesCount] = useState();
  const [solvedIssuesCount, setSolvedIssuesCount] = useState();
  const [notSolvedIssuesCount, setNotSolvedIssuesCount] = useState();

  const [processingCountForWater, setProcessingCountForWater] = useState(0);
  const [solvedCountForWater, setSolvedCountForWater] = useState(0);
  const [notSolvedCountForWater, setNotSolvedCountForWater] = useState(0);

  const [processingCountForRoad, setProcessingCountForRoad] = useState(0);
  const [solvedCountForRoad, setSolvedCountForRoad] = useState(0);
  const [notSolvedCountForRoad, setNotSolvedCountForRoad] = useState(0);

  const [processingCountForGarbage, setProcessingCountForGarbage] = useState(0);
  const [solvedCountForGarbage, setSolvedCountForGarbage] = useState(0);
  const [notSolvedCountForGarbage, setNotSolvedCountForGarbage] = useState(0);

  const [processingCountForStreetlight, setProcessingCountForStreetlight] = useState(0);
  const [solvedCountForStreetlight, setSolvedCountForStreetlight] = useState(0);
  const [notSolvedCountForStreetlight, setNotSolvedCountForStreetlight] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const processingResponse = await axios.get('http://localhost:8080/getProcessingCount');
        const solvedResponse = await axios.get('http://localhost:8080/getSolvedCount');
        const notSolvedResponse = await axios.get('http://localhost:8080/getNotSolvedCount');

        setSolvedIssuesCount(solvedResponse.data);
        setNotSolvedIssuesCount(notSolvedResponse.data);
        setTotalIssuesCount(processingResponse.data + solvedResponse.data + notSolvedResponse.data);

        setTotalData({
          processingCount: processingResponse.data,
          solvedCount: solvedResponse.data,
          notSolvedCount: notSolvedResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchWaterCategoryData = async () => {
      try {
        const waterProcessingResponse = await axios.post('http://localhost:8080/getProcessingCountByCategory', { category: 'Water Issues' });
        const waterSolvedResponse = await axios.post('http://localhost:8080/getSolvedCountByCategory', { category: 'Water Issues' });
        const waterNotSolvedResponse = await axios.post('http://localhost:8080/getNotSolvedCountByCategory', { category: 'Water Issues' });

        setProcessingCountForWater(waterProcessingResponse.data);
        setSolvedCountForWater(waterSolvedResponse.data);
        setNotSolvedCountForWater(waterNotSolvedResponse.data);

        setWaterCategoryData({
          processingCount: waterProcessingResponse.data,
          solvedCount: waterSolvedResponse.data,
          notSolvedCount: waterNotSolvedResponse.data,
        });
      } catch (error) {
        console.error('Error fetching water category data:', error);
      }
    };

    const fetchRoadCategoryData = async () => {
      try {
        const roadProcessingResponse = await axios.post('http://localhost:8080/getProcessingCountByCategory', { category: 'Road Issues' });
        const roadSolvedResponse = await axios.post('http://localhost:8080/getSolvedCountByCategory', { category: 'Road Issues' });
        const roadNotSolvedResponse = await axios.post('http://localhost:8080/getNotSolvedCountByCategory', { category: 'Road Issues' });

        setProcessingCountForRoad(roadProcessingResponse.data);
        setSolvedCountForRoad(roadSolvedResponse.data);
        setNotSolvedCountForRoad(roadNotSolvedResponse.data);

      } catch (error) {
        console.error('Error fetching road category data:', error);
      }
    };
    const fetchGarbageCategoryData = async () => {
      try {
        const garbageProcessingResponse = await axios.post('http://localhost:8080/getProcessingCountByCategory', { category: 'Garbage Management' });
        const garbageSolvedResponse = await axios.post('http://localhost:8080/getSolvedCountByCategory', { category: 'Garbage Management' });
        const garbageNotSolvedResponse = await axios.post('http://localhost:8080/getNotSolvedCountByCategory', { category: 'Garbage Management' });

        setProcessingCountForGarbage(garbageProcessingResponse.data);
        setSolvedCountForGarbage(garbageSolvedResponse.data);
        setNotSolvedCountForGarbage(garbageNotSolvedResponse.data);

        // You can create additional state variables and set data for each category as needed
      } catch (error) {
        console.error('Error fetching garbage category data:', error);
      }
    };
    const fetchStreetlightCategoryData = async () => {
      try {
        const streetlightProcessingResponse = await axios.post('http://localhost:8080/getProcessingCountByCategory', { category: 'streetlight outages' });
        const streetlightSolvedResponse = await axios.post('http://localhost:8080/getSolvedCountByCategory', { category: 'streetlight outagess' });
        const streetlightNotSolvedResponse = await axios.post('http://localhost:8080/getNotSolvedCountByCategory', { category: 'streetlight outages' });

        setProcessingCountForStreetlight(streetlightProcessingResponse.data);
        setSolvedCountForStreetlight(streetlightSolvedResponse.data);
        setNotSolvedCountForStreetlight(streetlightNotSolvedResponse.data);

        // You can create additional state variables and set data for each category as needed
      } catch (error) {
        console.error('Error fetching streetlight category data:', error);
      }
    };

    
    fetchData();
    fetchWaterCategoryData();
    fetchRoadCategoryData();
    fetchGarbageCategoryData();
    fetchStreetlightCategoryData();

  }, []);
//  P I E   C H A R T   D A T A 
  const pieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [totalData.processingCount, totalData.solvedCount, totalData.notSolvedCount],
        backgroundColor: ['#ad1578', '#43144f', '#30696b'],
      },
    ],
  };

  const waterCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForWater, solvedCountForWater, notSolvedCountForWater],
        backgroundColor: ['#11235A', '#92C7CF', '#F1E4C3'],
      },
    ],
  };
  const garbageCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForGarbage, solvedCountForGarbage, notSolvedCountForGarbage],
        backgroundColor: ['#FF004D', '#FAEF5D', '#647D87'],
      },
    ],
  };

  const roadCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForRoad, solvedCountForRoad, notSolvedCountForRoad],
        backgroundColor: ['#FAEF5D', '#597E52', '#FF004D'],
      },
    ],
  };

  const streetlightCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForStreetlight, solvedCountForStreetlight, notSolvedCountForStreetlight],
        backgroundColor: ['#ad1578', '#43144f', '#30696b'],
      },
    ],
  };

  return (
    <div className="Dashboard">
      <div className="numData">
        <div className="appie">
          <h1>
            <span style={{color: 'red'}}>NAMMA</span><br />
            <span style={{color: 'black'}}>கோவை</span><br />
          </h1>
        </div>
        <div className="report">
          <h2>Total issues: {totalIssuesCount} </h2>
          <h2>Solved: {solvedIssuesCount} </h2>
          <h2>Not Solved: {notSolvedIssuesCount} </h2>
        </div>
      </div>
      <div className="chart main">
        <h3>Total Issues in your Ward</h3>
        <BarChart className="mainBar" chartData={pieChartData} />
        <PieChart className="mainPie" chartData={pieChartData} />
        <LineChart className="mainLine" chartData={pieChartData} />
      </div>
      <div className="d2">
        <div className="categoryChart chart water">
          <PieChart chartData={waterCategoryPieChartData} />
          <h3>Water Issues</h3>
        </div>
        <div className="roadCategoryChart chart road">
          <PieChart chartData={roadCategoryPieChartData} />
          <h3>Road Issues</h3>
        </div>
      </div>
      <div className="d2">
        <div className="garbageCategoryChart chart garbage">
          <PieChart chartData={garbageCategoryPieChartData} />
          <h3>Garbage Issues</h3>
        </div>
        <div className="streetlightCategoryChart chart electrical">
          <PieChart chartData={streetlightCategoryPieChartData} />
          <h3>Electrical Issues</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
