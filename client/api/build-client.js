import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // Server side
    // namespace: ingress-nginx
    // servicename: ingress-nginx-controller
    // http://servicename.namespace.svc.cluster.local

    return axios.create({
      baseURL: 'http://www.ticketing-dev.xyz',
      headers: req.headers,
    });
  } else {
    // Browser side
    return axios.create({
      baseURL: '/',
    });
  }
};
