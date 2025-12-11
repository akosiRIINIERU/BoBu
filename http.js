import axio from 'axios';

const http = axios.create({
    baseURL: 'https://citc-ustpcdo.com/login',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});