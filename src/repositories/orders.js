import axios from 'axios';
import { apiUrl } from '../defaultValues';

export default class Orders {
  static getOrders = async (datas, accessToken) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return await axios
      .post(`${apiUrl}/orders`, datas, { headers })
      .then(response => response.data)
      .catch(err => console.log(err));
  };
};