import axios from 'axios';

export const login = async (email: string, password: string) => {
  return axios.post('/api/auth/login', { email, password });
};

export const logout = async () => {
  return axios.post('/api/auth/logout');
};

//회원가입때 필요한 정보?
export const signup = async (data: {
  email: string;
  password: string;
  username: string;
  usertype: string;
}) => {
  return axios.post('/api/auth/signup', data);
};
