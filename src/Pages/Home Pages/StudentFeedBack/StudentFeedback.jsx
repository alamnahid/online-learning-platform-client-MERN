// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import feedbackimg from "../../../assets/images/feedbakusertry.png"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const StudentFeedback = () => {

    const axiosPublic = useAxiosPublic()
    const { data: feedback = [], isLoading } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedbacks')
            return res.data;
        }
    })
    // console.log(feedback)
if(isLoading){
    return <Loading/>
}
    return (
        <div className='mt-32 px-[8%]'>
             <h1 className='text-center text-3xl font-bold border-l-4 border-r-4 border-orange-500 w-fit mx-auto px-4'>Insights from Students</h1>

            <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper mt-8"
      >
        {
            feedback?.map(item=><SwiperSlide  key={item.id}>
                <div data-aos="fade-up" className='lg:pb-20 '>
                <img className='w-[5rem] mx-auto h-[5rem]  rounded-[50%]' src={item?.userPhoto} alt="" />
    
                    <h1 className='text-2xl mt-6 font-bold text-center'>{item?.classTitle}</h1>
    
                    <p className='w-[50%] mt-4 text-gray-600 mx-auto text-center'>{item?.description}</p>
                   <div className=''>
                        <h3 className='text-lg text-gray-600 text-center mt-6 font-semibold'>{item?.userName}</h3>
                   
                   </div>
                </div>
            </SwiperSlide>)
        }





        
      </Swiper>
        </div>
    );
};

export default StudentFeedback;