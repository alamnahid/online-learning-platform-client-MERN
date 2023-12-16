import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link, useLoaderData } from "react-router-dom";

const MyEnrollClasses = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const classData = useLoaderData()
    // console.log(classData)
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    // console.log(payments)

    const filterData = (arr1, arr2) => {
        return arr1.filter(item1 =>
            arr2.some(item2 => item2.courseId === item1._id)
        );
    };
    const filteredData = filterData(classData, payments);

    //    console.log('------------>', filteredData)


    return (
        <div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-10 mx-[5%] xl:grid-cols-3 2xl:grid-cols-4">
                {
                    filteredData?.map(item => <Card key={item._id} className="mt-6 md:w-96 relative">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={item?.image}
                                alt="card-image"
                            />

                        </CardHeader>

                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {item?.title}
                            </Typography>
                            <Typography>
                                Instructor: {item?.name}
                            </Typography>


                        </CardBody>

                        <div className='flex justify-between items-center'>

                            <CardFooter className="pt-0">
                                <Link to={`/dashboard/enroll-classes/${item._id}`}> <Button className="bg-[#FB9C46] text-white font-semibold ">Continue</Button></Link>
                            </CardFooter>
                        </div>
                    </Card>)
                }
            </div>

        </div>
    );
};

export default MyEnrollClasses;