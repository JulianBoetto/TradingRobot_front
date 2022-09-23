import axios from 'axios';
import { apiUrl } from '../defaultValues';
import { notification } from "antd";

export default class Symbols {
  static getSymbols = async (accessToken) => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    try {
      const res = await axios.post(`${apiUrl}/symbols/allSymbols`, null, { headers })

      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
    }
  };  
};