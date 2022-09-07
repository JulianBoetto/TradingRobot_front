import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin } from "antd";
import Candles from "../../repositories/candles";
import { Empty } from 'antd';
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import Candle from "../../utils/candle";


function ApexChart() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setStateInterval] = useState("1m");

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

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLocaleLowerCase()}@kline_${interval}`, {
    onOpen: () => console.log("Connected to Binance"),
    onError: (err) => console.log(err),    
    shouldReconnect: () => 3000,
    onMessage: () => {
      if (lastJsonMessage) {
        const newCandle = new Candle(lastJsonMessage.k.t, lastJsonMessage.k.o, lastJsonMessage.k.h, lastJsonMessage.k.l, lastJsonMessage.k.c)
        let newData = [...series];

        if(lastJsonMessage.k.x === false) {
          newData[newData.length - 1] = newCandle;
          console.log("menos de 1 minuto")
        } else {
          newData.splice(0, 1);
          newData.push(newCandle);
        }
        console.log(series)
        setSeries(newData);
        console.log(series)
      }
    },
  });

  const onSymbolChange = (event) => {
    setSymbol(event.target.value)
  }

  const onIntervalChange = (event) => {
    setStateInterval(event.target.value)
  }

  useEffect(
    () => {
      !loading ?? setLoading(true);
      Candles.getKlines({ symbol, interval })
        .then(res => {
          setSeries([{ data: res }]);
          setLoading(false);
        })
        .catch(error => console.log(error))
        
    },
    [symbol, interval],
  );


  return (
    <div id="chart">
      <div className="container">
        <div className="row">
          <select className="form-select m-3" onChange={onSymbolChange}>
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="ETCUSDT">ETC/USDT</option>
          </select>

        </div>
        <div className="row">
          <select className="form-select m-3" onChange={onIntervalChange}>
            <option value="1m">1m</option>
            <option value="15m">15m</option>
            <option value="1d">1d</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      )}
    </div>
  )
}

export default ApexChart;