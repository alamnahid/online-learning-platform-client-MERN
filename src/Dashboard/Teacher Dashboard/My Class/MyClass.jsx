import { Link } from "react-router-dom";
import useClass from "../../../Hooks/useClass";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyClass = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // const [classs, refetch] = useClass();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)

    const { user } = useContext(AuthContext);
    const { refetch, data: classs = [] } = useQuery({
        queryKey: ['classs', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addclasses?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get(`/classescount/email?email=${user.email}`);
                setCount(res.data.totalCount);
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


    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/addclasses/${item._id}`)
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-[5%]">
                {
                    classs.map(classss => <Card key={classss._id} className="w-96">
                        <CardHeader floated={false} className="h-80">
                            <img className="w-full h-80" src={classss?.image} alt="profile-picture" />
                        </CardHeader>
                        <CardBody className="text-left">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Title: {classss?.title}
                            </Typography>
                            <Typography className="font-medium text-black mt-3" textGradient>
                                Name: {classss?.name}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium text-black mt-2" textGradient>
                                Email: {classss?.email}
                            </Typography>

                            <Typography color="blue-gray" className="font-medium text-black mt-2" textGradient>
                                Price: ${classss?.price}
                            </Typography>

                            <Typography color="blue-gray" className="font-medium h-[3rem] mt-2 overflow-hidden" textGradient>
                                Description: {classss?.description}
                            </Typography>


                            <Typography className="flex gap-5">

                                {
                                    classss.status === 'approved' && <button className="mt-4 btn btn-neutral bg-green-500 border-none text-white text-lg flex-1">Accepted</button>

                                }
                                {
                                    classss.status === 'rejected' && <button className="mt-4 btn btn-error bg-red-500 text-white text-lg flex-1">Rejected</button>

                                }
                                {
                                    classss.status === 'pending' && <button className="mt-4 btn btn-error bg-orange-800 text-white text-lg flex-1">Pending</button>

                                }
                                <Link to={`/dashboard/update-class/${classss._id}`}><button className="mt-4 btn btn-info text-white text-lg flex-1">Update</button></Link>
                                <button onClick={() => handleDeleteItem(classss)} className="mt-4 btn btn-error text-white text-lg flex-1">Delete</button>
                            </Typography>

                            <Typography color="blue-gray" className="font-medium" textGradient>
                                {
                                    classss.status === 'approved' ? <Link to={`/dashboard/myclass/${classss._id}`}><button className="mt-4 btn bg-orange-500 text-white text-lg w-full">See Details</button></Link>
                                        :
                                        <button disabled className="mt-4 btn btn-error text-white text-lg w-full">See Details</button>
                                }
                            </Typography>


                        </CardBody>

                    </Card>)
                }
            </div>
            
            <div className="mt-32">
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
        </div>
    );
};

export default MyClass;