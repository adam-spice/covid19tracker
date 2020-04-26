import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchData, fetchHistoricalData } from "./api";

import { Chart, CountryPicker, Cards } from "./components";
import image from "./images/image.png";

class App extends Component {
  state = { data: {}, country: "", historical: [] };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const historicalData = await fetchHistoricalData();
    this.setState({ data: fetchedData, historical: historicalData });
  }

  handleCountryChange = async country => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country, historical } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} historical={historical} />
      </div>
    );
  }
}

export default App;
