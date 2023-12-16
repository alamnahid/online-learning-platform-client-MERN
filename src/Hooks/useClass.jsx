import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: classs = [] } = useQuery({
        queryKey: ['classs', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/addclasses?email=${user.email}`);
            return res.data;
        }
    })

    return [classs, refetch]
};

export default useClass;