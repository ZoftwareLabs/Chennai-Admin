import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

const EleDash = () => {
  const [processingCountForStreetlight, setProcessingCountForStreetlight] = useState(0);
  const [solvedCountForStreetlight, setSolvedCountForStreetlight] = useState(0);
  const [notSolvedCountForStreetlight, setNotSolvedCountForStreetlight] =useState(0);

  useEffect(() => {
    const fetchStreetlightCategoryData = async () => {
      try {
        const streetlightProcessingResponse = await axios.post(
          "http://localhost:8080/getProcessingCountByCategory",
          { category: "streetlight outages" }
        );
        const streetlightSolvedResponse = await axios.post(
          "http://localhost:8080/getSolvedCountByCategory",
          { category: "streetlight outagess" }
        );
        const streetlightNotSolvedResponse = await axios.post(
          "http://localhost:8080/getNotSolvedCountByCategory",
          { category: "streetlight outages" }
        );

        setProcessingCountForStreetlight(streetlightProcessingResponse.data);
        setSolvedCountForStreetlight(streetlightSolvedResponse.data);
        setNotSolvedCountForStreetlight(streetlightNotSolvedResponse.data);
      } catch (error) {
        console.error("Error fetching streetlight category data:", error);
      }
    };
    fetchStreetlightCategoryData();
  }, []);
  //  P I E   C H A R T   D A T A
  const streetlightCategoryPieChartData = {
    labels: ["Processing", "Solved", "Not Solved"],
    datasets: [
      {
        data: [
          processingCountForStreetlight,
          solvedCountForStreetlight,
          notSolvedCountForStreetlight,
        ],
        backgroundColor: ["#ad1578", "#43144f", "#30696b"],
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
      <h1>Electrical Issues</h1>
      <div className="miniData">
        <PieChart className="" chartData={streetlightCategoryPieChartData} />
        <div className="rightt">
          <BarChart className="" chartData={streetlightCategoryPieChartData} />
          <LineChart className="" chartData={streetlightCategoryPieChartData} />
        </div>
      </div>
    </div>
  );
};

export default EleDash;
