import { Tooltip } from 'react-tooltip';
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";


const Partners = () => {
    const [partners, setPartner] = useState([])

    useEffect(() => {
        fetch('/partners.json')
            .then(res => res.json())
            .then(data => setPartner(data))
    }, [])
    return (
        <div className="lg:px-[8%] mt-16 flex flex-col md:flex-row items-center gap-5 md:gap-12">
            <p data-aos="fade-up" className="text-[#230F0F] lg:text-[1.75rem] font-semibold ">We partner with more than 10+ companies</p>

            <Marquee pauseOnHover className="md:h-[20rem]">
                {
                    partners?.map((item, index) => <div className="w-[15rem] text-center ml-8" key={index}>
                         <img className="w-[5rem] lg:w-[8rem] h-[2rem] lg:h-[3rem] mx-auto mb-3 cursor-pointer" src={item?.logo} alt="" />
                         
                         <div className='h-[1.9rem] lg:h-[3rem] text-xs overflow-hidden cursor-pointer'>
                         <a id="my-anchor-element">{item?.description}</a>
                                <Tooltip className=" text-white"
                                    anchorSelect="#my-anchor-element"
                                    content={item?.name}
                                />
                         </div>
                        
                    </div>)
                }
            </Marquee>

        </div>
    );
};

export default Partners;