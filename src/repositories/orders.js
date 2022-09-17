import axios from 'axios';
import { apiUrl } from '../defaultValues';
import { notification } from "antd";

export default class Orders {
  static getOrders = async (accessToken) => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    try {
      const res = await axios.post(`${apiUrl}/order/allOrders`, null, { headers })

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };

  static getOrder = async (symbol, order, accessToken) => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    try {
      const res = await axios.post(`${apiUrl}/order/${symbol}`, order, { headers });
      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };

  static getHistoricOrder = async (symbol, accessToken) => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }  

    try {
      const res = await axios.post(`${apiUrl}/order/historic/${symbol}`, null, { headers });

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };
};