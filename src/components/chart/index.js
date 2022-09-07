import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart(props) {  

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

  const series = [{
    data: props.data
  }];

  return (
    <ReactApexChart options={options} series={series} type="candlestick" height={350} />
  )
};