import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

const GarbageDash = () => {
    const [processingCountForGarbage, setProcessingCountForGarbage] = useState(0);
    const [solvedCountForGarbage, setSolvedCountForGarbage] = useState(0);
    const [notSolvedCountForGarbage, setNotSolvedCountForGarbage] = useState(0);
    useEffect(() => {
        const fetchGarbageCategoryData = async () => {
          try {
            const garbageProcessingResponse = await axios.post('http://localhost:8080/getProcessingCountByCategory', { category: 'Garbage Management' });
            const garbageSolvedResponse = await axios.post('http://localhost:8080/getSolvedCountByCategory', { category: 'Garbage Management' });
            const garbageNotSolvedResponse = await axios.post('http://localhost:8080/getNotSolvedCountByCategory', { category: 'Garbage Management' });
    
            setProcessingCountForGarbage(garbageProcessingResponse.data);
            setSolvedCountForGarbage(garbageSolvedResponse.data);
            setNotSolvedCountForGarbage(garbageNotSolvedResponse.data);
    
          } catch (error) {
            console.error('Error fetching garbage category data:', error);
          }
        };
        fetchGarbageCategoryData();
      }, []);
      const garbageCategoryPieChartData = {
        labels: ['Processing', 'Solved', 'Not Solved'],
        datasets: [
          {
            data: [processingCountForGarbage, solvedCountForGarbage, notSolvedCountForGarbage],
            backgroundColor: ['#FF004D', '#FAEF5D', '#647D87'],
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
        <a href="/garbage-Issues">Issues</a>
      </h1>
      <h1>Garbage Issues</h1>
      <div className="miniData">
        <PieChart className="" chartData={garbageCategoryPieChartData} />
        <div className="rightt">
          <BarChart className="" chartData={garbageCategoryPieChartData} />
          <LineChart className="" chartData={garbageCategoryPieChartData} />
        </div>
      </div>
    </div>
  );
}

export default GarbageDash;
