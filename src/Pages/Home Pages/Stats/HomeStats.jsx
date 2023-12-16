
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import statbg from "../../../assets/images/statbg.png"
import {  FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";


const HomeStats = () => {
    
    const axiosPublic = useAxiosPublic()

    const {data: stats, refetch} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async()=>{ 
            const res = await axiosPublic.get('/admin-stats');
            return res.data;
        },
        onSuccess: (data)=>{
            refetch()
        }
    })
    // console.log(stats)

    return (
        <div className="flex gap-4 flex-col lg:flex-row items-center justify-around md:px-[8%] md:mt-32">

            <div className="flex gap-2 md:gap-16 ">
                
                <div  data-aos="zoom-out-up" className="text-center space-y-4 border-2 p-4 rounded-tr-3xl cursor-pointer hover:bg-gray-300 w-[7rem] md:w-[10rem] flex flex-col justify-center items-center border-[#FB9C46]">
                    <FaUsers className="text-[3rem]"/>
                    <h1 className="text-4xl text-[#FB9C46] font-bold">{stats?.users}</h1>
                    <p className="text-lg font-medium">Total User</p>
                </div>

                <div  data-aos="zoom-out-down" className="text-center space-y-4 border-2 p-4 rounded-tr-3xl cursor-pointer hover:bg-gray-300 border-[#FB9C46] w-[7rem] md:w-[10rem] flex flex-col justify-center items-center">
                <SiGoogleclassroom className="text-[3rem]" />

                    <h1 className="text-4xl text-[#FB9C46] font-bold">{stats?.classItems}</h1>
                    <p className="text-lg font-medium">Total Classes</p>
                </div>

                <div  data-aos="zoom-out-up" className="text-center border-[#FB9C46] space-y-4 border-2 p-4 rounded-tr-3xl cursor-pointer hover:bg-gray-300  w-[7rem] md:w-[10rem] flex flex-col justify-center items-center">
                <PiStudentFill className="text-[3rem]" />
                    <h1 className="text-4xl text-[#FB9C46] font-bold">{stats?.enrolls}</h1>
                    <p className="text-lg font-medium">Total Enrollment</p>
                </div>

            </div>


            <div>
                <img src={statbg} alt="" />

            </div>

        </div>
    );
};

export default HomeStats;