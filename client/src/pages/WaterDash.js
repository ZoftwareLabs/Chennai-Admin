import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';

const WaterDash = () => {
  const [processingCountForWater, setProcessingCountForWater] = useState(0);
  const [waterCategoryData, setWaterCategoryData] = useState({})
  const [solvedCountForWater, setSolvedCountForWater] = useState(0);
  const [notSolvedCountForWater, setNotSolvedCountForWater] = useState(0);

  useEffect(() => {
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
    fetchWaterCategoryData();
  }, []);
  const waterCategoryPieChartData = {
    labels: ['Processing', 'Solved', 'Not Solved'],
    datasets: [
      {
        data: [processingCountForWater, solvedCountForWater, notSolvedCountForWater],
        backgroundColor: ['#11235A', '#92C7CF', '#F1E4C3'],
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
        <a href="/water-Issues">Issues</a>
      </h1>
      <h1>Water Issues</h1>
      <div className="miniData">
        <PieChart className="" chartData={waterCategoryPieChartData} />
        <div className="rightt">
          <BarChart className="" chartData={waterCategoryPieChartData} />
          <LineChart className="" chartData={waterCategoryPieChartData} />
        </div>
      </div>
    </div>
  );
}

export default WaterDash;
