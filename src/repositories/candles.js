import axios from 'axios';
import { apiUrl } from '../defaultValues';
import { notification } from "antd"

export default class Candles {
  static getKlines = async (data, accessToken) => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    try {
      const res = await axios.post(`${apiUrl}/klines`, data, { headers });

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };
};