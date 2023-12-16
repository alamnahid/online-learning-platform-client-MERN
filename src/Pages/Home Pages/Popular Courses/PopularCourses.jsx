import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaDiscourse } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Tooltip } from 'react-tooltip';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const PopularCourses = () => {
    const axiosPublic = useAxiosPublic()
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addclasses/adminroute/approved?sortField=enrollCount&sortOrder=desc')
            return res.data;
        }
    })
    // console.log(courses)
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='mt-20 px-[8%]'>
            <h1 className='text-center text-3xl font-bold border-l-4 border-r-4 border-orange-500 w-fit mx-auto px-4'>Popular Courses</h1>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mt-12"
                autoplay
                breakpoints={{
                    320: {
                      slidesPerView: 1, // 1 slide per view on small screens (mobile devices)
                    },
                    768: {
                      slidesPerView: 1.5, // 2 slides per view on tablets
                    },
                    1024: {
                      slidesPerView: 4, // 4 slides per view on desktop devices
                    },
                  }}

            >
                {
                    courses.slice(0,6)?.map(course=><SwiperSlide key={course._id} className='pb-12'>
                    <Card className="mt-6 w-96 relative">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img className='h-56'
                                src={course?.image}
                                alt="card-image"
                            />

                        </CardHeader>
                        <Typography variant="h5" color="blue-gray" className="absolute top-[9.5rem] bg-white px-4 h-[2.3rem] w-[4rem] flex items-center gap-1 py-1 rounded-lg left-8">
                               <PiStudentBold/> {course?.enrollCount}
                            </Typography>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {course?.title}
                            </Typography>
                            <Typography>
                                Instructor: {course?.name}
                            </Typography>
                            <Typography className='h-[3rem] overflow-hidden cursor-pointer'>
                                <a id="my-anchor-element">{course?.description}</a>
                                <Tooltip
                                    anchorSelect="#my-anchor-element"
                                    content={course?.description}
                                />
                            </Typography>

                        </CardBody>

                        <div className='flex justify-between items-center'>
                            <CardFooter className="pt-0 text-xl font-semibold">
                                ${course?.price}
                            </CardFooter>
                            <CardFooter className="pt-0">
                                <Button className='bg-[#FB9C46] flex items-center gap-1 text-white text-base px-8'><FaDiscourse/> Enroll</Button>
                            </CardFooter>
                        </div>
                    </Card>
                </SwiperSlide>)
                }

                


              

                
               

            </Swiper>

        </div>
    );
};

export default PopularCourses;