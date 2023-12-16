import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacherrequest/teacher/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isTeacher, isTeacherLoading]
};

export default useTeacher;