import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ReactStars from "react-rating-stars-component";


const AdminClassDetails = () => {
    const classData = useLoaderData();
    const axiosPublic = useAxiosPublic()
    const { data: feedback = [], refetch } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedbacks')
            return res.data;
        }
    })
    console.log(feedback)
    console.log(classData)
    const filterFeedback = feedback.filter(item => item?.classId === classData?._id)
    console.log(filterFeedback)
    return (
        <div>
            {
                filterFeedback.length>0 ? <div className="flex flex-col mt-8 justify-center items-center gap-10 h-[80vh]">
                {
                    filterFeedback?.map(item => <div key={item._id} className="w-[90%] lg:w-[70%] rounded-3xl h-[17rem] bg-orange-200 px-8 pt-6 overflow-hidden">
                        <div className="flex items-center gap-3">
                            <img className="w-[4rem] h-[3.8rem] rounded-[50%] border-2 border-white" src={item?.userPhoto} alt="" />
                            <h1 className="text-xl font-bold">{item?.userName}</h1>
                        </div>
                        <h1 className="text-base mt-3">{item?.description}</h1>
                        <ReactStars
                            count={5}
                            value={item?.rating}
                            size={54}
                            activeColor="#FE8B1F"
                        />,
                    </div>)
                }
            </div>

            :

            <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-3xl font-bold text-orange-600">There is no feedback for this class</h1>
            </div>
            }

        </div>
    );
};

export default AdminClassDetails;