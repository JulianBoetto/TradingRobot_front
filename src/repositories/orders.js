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
      const res = await axios.post(`${apiUrl}/orders`, datas, { headers });

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };
};