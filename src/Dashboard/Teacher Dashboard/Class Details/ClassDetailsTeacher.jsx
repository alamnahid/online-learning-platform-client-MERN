import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PiStudentBold } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import moment from "moment";


const ClassDetailsTeacher = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const classData = useLoaderData();
    console.log(classData)
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const axiosPublic = useAxiosPublic()
    const { data: assignments = [], refetch: refetchAssignment } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assignments')
            return res.data;
        }
    })
    console.log(assignments)

    const { data: assignmentssubmission = [], refetch: refetchassignmentssubmission } = useQuery({
        queryKey: ['assignmentssubmission'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assignmentsubmission')
            return res.data;
        }
    })
    

    const filterAssignment = assignments.filter(item => item.classId === classData._id)
    console.log(filterAssignment)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate } = useMutation({
        mutationKey: ['food'],
        mutationFn: (addingData) => {
            return axios.post('http://localhost:5000/assignments', addingData, { withCredentials: true, })
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assignment Added",
                showConfirmButton: false,
                timer: 1500
            });
            handleOpen()
            refetchAssignment();
        }

    })

    const onSubmit = async (data) => {
        console.log(data)
        mutate({
            title: data.title,
            deadline: data.deadline,
            description: data.description,
            classId: id

        })
        reset()


    }

    console.log(id)
    console.log(assignmentssubmission)
    const todayDate = moment().format('l');
    console.log(todayDate)
    const filterAssignmentsubmissionthiscourse = assignmentssubmission.filter(item=>item?.classId===id)
    console.log('assignment for this course-------> ', filterAssignmentsubmissionthiscourse)

    // filter with current date 
    const filterforperday = filterAssignmentsubmissionthiscourse.filter(item=>item?.today===todayDate)
    console.log('per day -------------> ', filterforperday)

    return (
        <div>

            <div>
                <h1 className="text-2xl font-bold text-center mt-20">Class Progress </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10">
                    <div className="w-[17rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#fb46ec] items-center flex flex-col justify-center text-center gap-5">
                        <PiStudentBold className="text-[6rem] ml-0" />

                        <p className="text-3xl font-semibold">{classData?.enrollCount>0? classData?.enrollCount : 0}</p>
                        <p className="text-2xl font-semibold">Total Enrollment</p>

                    </div>
                    <div className="w-[17rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#fbe046] items-center flex flex-col justify-center text-center gap-5">
                        <MdAssignment className="text-[6rem] ml-0"/>

                        <p className="text-3xl font-semibold">{filterAssignment?.length}</p>
                        <p className="text-2xl font-semibold">Total Assignments</p>

                    </div>

                    <div className="w-[17rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#55fb46] items-center flex flex-col justify-center text-center gap-5">
                        <MdAssignment className="text-[6rem] ml-0"/>

                        <p className="text-3xl font-semibold">{filterforperday?.length>0? filterforperday?.length : <p className="text-xl">No assignment submit today</p>}</p>
                        <p className="text-2xl font-semibold">Per Day Submission</p>

                    </div>
                </div>


            </div>



            <div>
               <div className="text-center">
               <Button onClick={handleOpen} variant="gradient" className="text-xl mt-20 ">
                    Create Assignments
                </Button>
               </div>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Create Class Assignment</DialogHeader>
                    <DialogBody>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <p className="text-[#444] mt-5 text-xl font-semibold">Title</p>

                            <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="title" id="" placeholder="Enter Title" {...register("title", { required: true })} />
                            {errors.title && <span>This field is required</span>}

                            <p className="text-[#444] mt-5 text-xl font-semibold">Deadline</p>

                            <input className="w-full pr-6 mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="datetime-local" name="deadline" id="" placeholder="Enter Deadline" {...register("deadline", { required: true })} />
                            {errors.deadline && <span>This field is required</span>}


                            <p className="text-[#444] mt-5 text-xl font-semibold">Description</p>

                            <input className="w-full mt-2 h-[6.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="description" id="" placeholder="Enter Description" {...register("description", { required: true })} />
                            {errors.description && <span>This field is required</span>}


                            <input className="w-full mt-5 h-[3.5rem] btn btn-neutral border-none bg-[#faa018b3] text-white text-xl font-bold" type="submit" id="" value="Create" />


                        </form>
                    </DialogBody>
                    <DialogFooter>

                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Cancel</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>

        </div>
    );
};

export default ClassDetailsTeacher;