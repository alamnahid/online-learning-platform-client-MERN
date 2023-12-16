import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect } from "react";

const TeacherRequest = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)

    const { data: teachers = [], refetch } = useQuery({
        queryKey: ['teachers',currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacherrequest?page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/teacherrequestcount');
                setCount(res.data.count);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData(); // Call the async function inside useEffect
    }, []);

    // const { data: teacherrequestcount = [] } = useQuery({
    //     queryKey: ['teacherrequestcount'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/teacherrequestcount')
    //         return res.data;
    //     }
    // })
    
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = []
    for(let i = 0; i < numberOfPages; i++){
        pages.push(i)
    }
    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
        refetch()
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
        refetch()
    }
    // console.log(teachers)

    const handleApprove = teacher => {
        const updateRole = {
            role: 'teacher'
        }
        axiosSecure.put(`/teacherrequest/teacher/${teacher._id}`, updateRole)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Teacher Request Approved",
                        showConfirmButton: false,
                        timer: 1500
                      });

                }
            })
    }

    const handleReject = teacher => {
        const updateRole = {
            role: 'rejected'
        }
        axiosSecure.put(`/teacherrequest/teacher/${teacher._id}`, updateRole)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Teacher Request Rejected",
                        showConfirmButton: false,
                        timer: 1500
                      });

                }
            })
    }

    return (

        <div>
            <div className="overflow-x-auto rounded-tl-2xl rounded-tr-2xl mt-20 mx-[5%]">
                <table className="table  rounded-tl-2xl rounded-tr-2xl ">
                    <thead className="bg-orange-300 text-xs md:text-base lg:text-xl h-[4.5rem] rounded-tl-2xl rounded-tr-2xl">
                        <tr>
                            <th className="text-white text-xs lg:text-base lg:font-semibold"></th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Name</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Image</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Experience</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Title</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Category</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Status</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Approve</th>
                            <th className="text-white text-xs lg:text-base lg:font-semibold">Rejeect</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            teachers.map((teacher, index) => <tr key={teacher._id}>
                                <th className="text-xs lg:text-base">{index + 1}</th>
                                <th className="text-xs lg:text-base">{teacher?.name}</th>
                                <td><img className="w-[2rem] lg:w-[4rem] h-[2rem] lg:h-[4rem] rounded-[4rem] border-2 border-black" src={teacher?.photo} alt="" /></td>
                                <td className=" text-xs lg:text-base">{teacher?.experince}</td>
                                <td className=" text-xs lg:text-base">{teacher?.title}</td>
                                <td className=" text-xs lg:text-base">{teacher?.category}</td>
                                <td className=" text-xs lg:text-base">{teacher.role==='teacher' ? 'accepted' : teacher.role==='rejected'? 'rejected': 'pending'}</td>
                                <td className=" text-xs lg:text-base">{
                                    teacher.role === 'teacher' || teacher.role==='rejected' ? <button disabled className="mt-4 btn btn-success text-white text-lg flex-1">Approve</button> : 
                                    
                                    <button onClick={() => handleApprove(teacher)} className="mt-4 btn btn-success text-white text-lg flex-1">Approve</button>
                                    
                                }</td>

                                <td>{
                                    teacher.role === 'rejected' || teacher.role==='teacher' ? <button disabled className="mt-4 btn btn-success text-white text-lg flex-1">Reject</button> : <button onClick={() => handleReject(teacher)} className="mt-4 btn btn-error text-white text-lg flex-1">Reject</button>
                                }</td>



                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


            <div className='text-center mb-10 space-x-4 md:space-x-6 mt-20'>
              
              <button className="btn  btn-outline border-orange-500 border-4 md:w-[7rem] md:text-lg" onClick={handlePrevPage}>Prev</button>
              {
                  pages.map(page => <button
                      className={currentPage === page ? 'btn bg-orange-500 text-xl font-bold text-white' : 'btn btn-outline border-orange-500 border-4 text-xl'}
                      onClick={() => setCurrentPage(page)}
                      key={page}
                  >{page}</button>)
              }
              <button className="btn btn-outline border-orange-500 border-4 md:w-[7rem] md:text-lg" onClick={handleNextPage}>Next</button>
              <select className="btn bg-orange-500 text-xl text-white" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
              </select>
          </div>

            
        </div>
    );
};

export default TeacherRequest;