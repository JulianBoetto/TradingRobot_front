import React from "react";
import ReactApexChart from "react-apexcharts";
import { Spin } from "antd";
import Candles from "../../repositories/candles";
import { Empty } from 'antd';

export default class ApexChart extends React.Component {
  state = {
    series: [],
    loading: true,
  };


  render() {
    const {
      series,
      loading,
    } = this.state;

    const options = {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: '',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };

    if (!series.length) {
      Candles.getKlines({ symbol: "BTCUSDT", interval: "1m" })
        .then(res => {
          this.setState({ series: [{ data: res }], loading: false })
        })
        .catch(error => console.log(error))
    }

    return (
      <div id="chart">
        {loading ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            {loading ? (
              <Spin />
            ) : (
              <>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <ReactApexChart options={options} series={series} type="candlestick" height={350} />
              </>
            )}
          </>
        )}

      </div>
    )
  }
};