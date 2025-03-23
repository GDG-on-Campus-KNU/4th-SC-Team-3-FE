import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 기본 API URL
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  headers: {
    'Content-Type': 'application/json', // 기본 콘텐츠 타입
    Accept: 'application/json', // 서버가 JSON 응답을 보낸다고 가정
  },
});

// 요청 인터셉터: 인증 토큰 추가
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 에러 처리
axiosClient.interceptors.response.use(
  (response) => response.data, // 응답 데이터만 반환
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized Error:', error);
    }
    return Promise.reject(error);
  },
);
