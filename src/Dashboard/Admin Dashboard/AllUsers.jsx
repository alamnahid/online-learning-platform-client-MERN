import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect } from "react";


const AllUsers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [search, setSearch] = useState('')
    const axiosPublic = useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(search)
    }
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', search, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search.toString()}&page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })
    // console.log(users)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/admin-stats');
                setCount(res.data.users);
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

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User is Admin Now",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }
    return (
        <div className="mx-[5%] pt-20">
            <div>
                <form onSubmit={handleSearch} className="flex mt-6">
                    <input type="text" name="search" placeholder="Search Here" className="input input-bordered input-success w-full border-orange-500 rounded-r-none max-w-xs bg-white" />

                    <input className="btn rounded-l-none  btn-secondary text-white text-xl bg-orange-400 border-none  capitalize " type="submit" value="search" />
                </form>
            </div>
            <div className="overflow-x-auto rounded-tl-2xl rounded-tr-2xl mt-8 ">
                <table className="table  rounded-tl-2xl rounded-tr-2xl">
                    {/* head */}
                    <thead className="bg-orange-300 text-xl h-[4.5rem] rounded-tl-2xl rounded-tr-2xl">
                        <tr>
                            <th className="text-white font-semibold"></th>

                            <th className="text-white font-semibold">Name</th>
                            <th className="text-white font-semibold">Email</th>
                            <th className="text-white font-semibold">Image</th>
                            <th className="text-white font-semibold">Role</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>

                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <th><img className="w-[4rem] h-[4rem] rounded-md border-2" src={user?.photo} alt="" /></th>

                                <td className="">
                                    {
                                        user.role === 'admin' ? <button disabled className="btn  rounded-md  btn-neutral border-none btn-sm">Make Admin</button> : <button onClick={() => handleMakeAdmin(user)} className="btn  rounded-md  btn-neutral border-none btn-sm">Make Admin</button>
                                    }

                                </td>



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

export default AllUsers;