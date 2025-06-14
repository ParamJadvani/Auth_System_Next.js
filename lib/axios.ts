// lib/axios.ts
import { onRequest, onResponse, onResponseError } from "@/utils/apiInterception";
import axios from "axios";

const API = axios.create({
    baseURL: "https://adonis-payroll.s.arrangic.com",
    withCredentials: true,
});

API.interceptors.request.use(onRequest);
API.interceptors.response.use(onResponse, onResponseError);

export default API;
