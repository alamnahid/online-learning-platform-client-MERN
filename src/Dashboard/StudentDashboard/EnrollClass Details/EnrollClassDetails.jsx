import { useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment/moment";


const EnrollClassDetails = () => {
    const { id } = useParams()
    const classData = useLoaderData();
    console.log(classData)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0)
    const handleOpen = () => setOpen(!open);
    const {user} = useContext(AuthContext);
    console.log(user)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(id)
    const axiosPublic = useAxiosPublic()
    const { data: assignments = [],  } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assignments')
            return res.data;
        }
    })
    console.log(assignments)
    const filterAssignment = assignments.filter(item => item.classId === id)
    console.log(filterAssignment)
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating)
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate: mutateFirst } = useMutation({
        mutationKey: ['feedback'],
        mutationFn: (addingData) => {
              return axios.post('http://localhost:5000/feedbacks', addingData, { withCredentials: true, })
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank You For You Feedback",
                showConfirmButton: false,
                timer: 1500
            });
            handleOpen()
            
        }

    })
    const onSubmit = async (data) => {
        console.log(data)
        mutateFirst({
            
            description: data.description,
            rating: rating,
            classId: id,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            classTitle: classData?.title



          })
          reset()


    }
   const today = moment().format('l');
   
   const { mutate: mutateSecond  } = useMutation({
    mutationKey: ['assignment'],
    mutationFn: (data) => {
          return axios.post('http://localhost:5000/assignmentsubmission', data, { withCredentials: true, })
    },
    onSuccess: () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your assignment is Submitted",
            showConfirmButton: false,
            timer: 1500
        });
        
    }

})


    const handleSubmitAssignment = (assignmentid)=>{
        console.log('click', assignmentid)
        console.log(id)
        console.log(today)
        mutateSecond({
            
            assignmentid: assignmentid,
            classId: id,
            today: today,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            classTitle: classData?.title
          })


    }

    return (
        <div>

            <div>
                <Button className="ml-[5%] mt-20 h-[4rem] text-xl" onClick={handleOpen} variant="gradient">
                    Teaching Evaluation Report
                </Button>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Teaching Evaluation Report</DialogHeader>
                    <DialogBody>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <p className="text-[#444] mt-5 text-xl font-semibold">Description</p>

                            <input className="w-full mt-2 h-[4.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="description" id="" placeholder="Enter Description" {...register("description", { required: true })} />
                            {errors.description && <span>This field is required</span>}

                            <p className="text-[#444] mt-5 text-xl font-semibold">Rating</p>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={44}
                                activeColor="#ffd700"
                            />



                            <input className="w-full mt-5 h-[3.5rem] btn btn-neutral border-none bg-[#D1A054B3] text-white text-xl font-bold" type="submit" id="" value="Send" />


                        </form>
                    </DialogBody>
                    <DialogFooter>

                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Cancel</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>

            <div className="overflow-x-auto rounded-tl-2xl rounded-tr-2xl mt-8 mx-[5%]">
                <table className="table  rounded-tl-2xl rounded-tr-2xl">
                    {/* head */}
                    <thead className=" h-[4.5rem] rounded-tl-2xl rounded-tr-2xl bg-[#F0D9CA]">
                        <tr>
                            <th className="text-white font-semibold"></th>

                            <th className="text-black text-xs md:text-base lg:text-xl  font-bold">Title</th>
                            <th className="text-black text-xs md:text-base lg:text-xl  font-bold">Description</th>
                            <th className="text-black text-xs md:text-base lg:text-xl  font-bold">Deadline</th>
                            <th className="text-black text-xs md:text-base lg:text-xl  font-bold">Submit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            filterAssignment.map((assignment, index) => <tr key={assignment._id}>
                                <th className="text-xs md:text-base lg:text-lg">{index + 1}</th>
                                <td className="text-xs md:text-base lg:text-lg">{assignment?.title}</td>
                                <td className="text-xs md:text-base lg:text-lg">{assignment?.description}</td>
                                <td className="text-xs md:text-base lg:text-lg">{assignment?.deadline}</td>

                                <td className="">
                                <button onClick={()=>handleSubmitAssignment(assignment?._id)} className="btn md:w-[8rem] h-[3rem] md:text-xl  rounded-md  btn-neutral border-none ">Submit</button>

                                </td>



                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default EnrollClassDetails;