import axios from 'axios';
import { apiUrl } from '../defaultValues';
import { notification } from "antd"

export default class Orders {
  static getOrders = async (datas, accessToken) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.get(`${apiUrl}/orders`, datas, { headers });

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };

  static getOrder = async (symbol, order) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.post(`${apiUrl}/order/${symbol}`, order, { headers });

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };
};