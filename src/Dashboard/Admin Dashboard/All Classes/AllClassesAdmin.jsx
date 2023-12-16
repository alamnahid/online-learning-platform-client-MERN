import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect } from "react";


const AllClassesAdmin = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const axiosSecure = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)
    const axiosPublic = useAxiosPublic();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes',currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addclasses/adminroute?page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })
    // console.log(classes)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/allclassescount');
                setCount(res.data.count);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData(); // Call the async function inside useEffect
    }, []);



    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
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

    const handleMakeApprove = classs =>{
        const updateStatus={
            status:'approved'
        }
        axiosSecure.put(`/addclasses/adminroute/admin/${classs._id}`, updateStatus)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Class Approved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                
            }
        })
    }

    const handleReject = classs =>{
        const updateStatus={
            status:'rejected'
        }
        axiosSecure.put(`/addclasses/adminroute/admin/${classs._id}`, updateStatus)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Class is Rejected",
                    showConfirmButton: false,
                    timer: 1500
                  });
                
            }
        })
    }

    

    return (
        <div className="mx-[5%] pt-12">
           <h1 className="text-center text-3xl">All Classes</h1>

           <div>
           <div className="overflow-x-auto rounded-tl-2xl rounded-tr-2xl mt-8">
                        <table className="table  rounded-tl-2xl rounded-tr-2xl">
                            {/* head */}
                            <thead className="bg-orange-300 text-lg h-[4.5rem] rounded-tl-2xl rounded-tr-2xl">
                                <tr>
                                    <th className="text-white font-semibold"></th>
                                    <th className="text-white font-semibold">Title</th>
                                    <th className="text-white font-semibold">Image</th>
                                    <th className="text-white font-semibold">Email</th>
                                    <th className="text-white font-semibold">Short Description</th>
                                    <th className="text-white font-semibold">Approve</th>
                                    <th className="text-white font-semibold">Reject</th>
                                    <th className="text-white font-semibold">See Progress</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    classes.map((classs, index)=><tr key={classs._id}>
                                        <th>{index+1}</th>
                                        <td>{classs.title}</td>
                                        <th><img className="w-[6rem] h-[4rem]" src={classs?.image} alt="" /></th>
                                        <td>{classs.email}</td>
                                        <td className="">{classs.description}</td>
                                        <td>{
                                            classs.status==='approved' ? <button disabled className="btn  rounded-md  btn-neutral border-none btn-sm">Approve</button> :  <button onClick={()=>handleMakeApprove(classs)} className="btn  rounded-md  btn-success text-white border-none btn-sm">Approve</button>
                                           }</td>
                                        
                                        <td>{
                                            classs.status==='rejected' ? <button disabled className="btn  rounded-md  btn-error border-none btn-sm">Rejected</button> :  <button onClick={()=>handleReject(classs)} className="btn  rounded-md  btn-error text-white border-none btn-sm">Rejected</button>
                                           }</td>
                                        <td>{classs.status==='approved' ? <Link to={`/dashboard/classes/${classs._id}`}><button className="btn btn-md btn-info text-white">See Prograss</button></Link> : <button disabled className="btn btn-md">See Progress</button>}
                                            </td>
                                       
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>

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

export default AllClassesAdmin;