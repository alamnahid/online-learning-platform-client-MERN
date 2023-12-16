import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://letsyourskillupserver.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;