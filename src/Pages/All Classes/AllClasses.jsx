import { useQuery } from "@tanstack/react-query";
import DisplayAllClasses from "./DisplayClasses/DisplayAllClasses";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { useEffect } from "react";


const AllClasses = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const axiosPublic = useAxiosPublic()
    const { data: classes = [], refetch: refetchclasses, isLoading } = useQuery({
        queryKey: ['classes', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/addclasses/adminroute/approved?page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })
    // console.log(classes)

   


    const [count, setCount] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/addclassescount');
                setCount(res.data.count);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData(); // Call the async function inside useEffect
    }, []);
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
        refetchclasses()
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
        refetchclasses()
    }
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className="px-[5%]">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 mt-20 lg:pt-20 justify-items-center items-center gap-8">
                {
                    classes.map(classs=><DisplayAllClasses classs={classs} key={classs._id}/>)
                }
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

export default AllClasses;