import bannerimage from "../../assets/images/banner-image.png"
import rocket from "../../assets/images/rocket.png"
import award from "../../assets/images/awart.png"
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
import { MdPlayLesson } from "react-icons/md";

const Banner = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:px-[8%] md:mt-20 pt-20">

            <div data-aos="fade-up" className="px-4 lg:px-0 mt-6 lg:mt-0">
            
                <h1 className="lg:w-[40rem] text-black text-xl md:text-2xl lg:text-[3rem] font-bold md:leading-[4.8rem]">Learn From Home
                    With </h1>

                    <TypeAnimation
                    sequence={[
                        ' The Best Online Tutors',
                        1000,
                        'Learn Skills Online with Ease',
                        1000,
                        'The Best Online Tutors',
                        1000,
                        'Learn Skills Online with Ease',
                        1000,
                    ]}
                    speed={50}
                    className='text-2xl md:text-5xl font-bold md:leading-[4.5rem] lg:w-[40rem] text-[#FB9C46]'
                    repeat={Infinity}
                />

                <p className="lg:w-[47rem] text-[#6C6C6C] text-base lg:text-lg mt-6">Embark on a journey of continuous learning! Explore a world of opportunities and enhance your skills with our diverse range of online courses. From technical expertise to creative pursuits, our platform offers a seamless learning experience tailored to your pace and preferences.</p>

                <div className="text-center md:text-left">
                    <Link to='/all-classes'>
                    
                    <button className="btn mt-6 btn-success w-[18rem] h-[3.8rem] bg-[#058E6E] text-white text-base font-semibold"><MdPlayLesson/> Try Free Lessons</button>
                    </Link>
                </div>
            </div>


            <div data-aos="fade-down" className="relative">
                <div style={{background: "linear-gradient(139deg, #F1C365 7.67%, #F6AE54 40.13%, #FF922F 59.18%)"}} className="lg:w-[28rem] lg:h-[39rem] rounded-[12.75rem] flex justify-center items-center overflow-hidden">
                    <img className="pt-5 w-[50vw] md:w-[30vw] lg:w-auto" src={bannerimage} alt="" />
                </div>


                <img className="absolute -top-10 lg:-top-20 -left-32 lg:-left-52 " src={rocket} alt="" />
                <img className="absolute -bottom-[2rem] lg:-bottom-32 -right-20 md:-right-32 " src={award} alt="" />
            </div>

        </div>
    );
};

export default Banner;