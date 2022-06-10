import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://api.jinwoo.space',
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
