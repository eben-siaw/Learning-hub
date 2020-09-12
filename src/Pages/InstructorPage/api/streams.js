import axios from 'axios';

export default axios.create({
  baseURL: 'https://nilee-jsonserver.herokuapp.com',
});
