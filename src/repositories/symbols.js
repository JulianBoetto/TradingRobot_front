import axios from 'axios';
import { apiUrl } from '../defaultValues';
import { notification } from "antd";
// import { useNavigate } from 'react-router-dom';

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
  
  static addSymbol = async (accessToken, symbol, pair) => {
    // const navigate = useNavigate();
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
    
    try {
      const res = await axios.post(`${apiUrl}/symbols/createSymbol`, {symbol, pair}, { headers })
      
      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
      // navigate("/login");
    }
  };

  static removeSymbol = async (accessToken, symbol, pair) => {
    // const navigate = useNavigate();
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
    
    try {
      const res = await axios.delete(`${apiUrl}/symbols/removeSymbol/${symbol}/${pair}`, { headers })
      
      return res.data;
    } catch (error) {
      notification.error({
        message: `Erro: ${error}`,
      });
      // navigate("/login");
    }
  };
};