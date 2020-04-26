import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Bar, Line } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths },
  country,
  historical
}) => {
  let selected = country;

  const selectedCountry = historical[selected];

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = selectedCountry ? (
    <Line
      data={{
        labels: selectedCountry.map(({ date }) => date),
        datasets: [
          {
            data: selectedCountry.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: selectedCountry.map(({ recovered }) => recovered),
            label: "Recovered",
            borderColor: "rgba(0,255,0)",
            fill: true
          },
          {
            data: selectedCountry.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            fill: true
          }
        ]
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  return (
    <>
      <div className={styles.container}>{!country ? barChart : lineChart}</div>
      <br />
    </>
  );
};

export default Chart;
