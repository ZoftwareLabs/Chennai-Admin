import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';

const RoadDash = () => {
  const [processingCountForRoad, setProcessingCountForRoad] = useState(0);
  const [solvedCountForRoad, setSolvedCountForRoad] = useState(0);
  const [notSolvedCountForRoad, setNotSolvedCountForRoad] = useState(0);

  useEffect(() => {
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
    fetchRoadCategoryData();
  }, []);

  const roadCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForRoad, solvedCountForRoad, notSolvedCountForRoad],
        backgroundColor: ['#FAEF5D', '#597E52', '#FF004D'],
      },
    ],
  };
  return (
    <div className="eleDashboard">
      <h1>
        <span style={{ color: "red" }}>NAMMA</span>
        <br />
        <span style={{ color: "black" }}>கோவை</span>
        <br />
      </h1>
      <h1>Road Issues</h1>
      <div className="miniData">
        <PieChart className="" chartData={roadCategoryPieChartData} />
        <div className="rightt">
          <BarChart className="" chartData={roadCategoryPieChartData} />
          <LineChart className="" chartData={roadCategoryPieChartData} />
        </div>
      </div>
    </div>
  );
}

export default RoadDash;
