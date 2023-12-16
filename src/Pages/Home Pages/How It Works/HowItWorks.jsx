import person from "../../../assets/images/persons.svg"
import calendar from "../../../assets/images/Calendar.svg"
import laptop from "../../../assets/images/bi_laptop-fill.svg"
import workbg from "../../../assets/images/workbg.png"

const HowItWorks = () => {
    return (
        <div className="px-4 md:px-[10%] lg:mt-32 bg-gradient-to-r from-[#faf5ef80]">
            <div className="py-16 flex justify-between items-center flex-col-reverse lg:flex-row gap-4">
                <div data-aos="zoom-in-down">
                    <h1 className="text-[#393939] text-2xl leading-[3rem] md:text-[2rem] font-semibold">Unlock Your Potential: <br /> <span className="text-[#FB9C46]">Here’s How It Works</span> </h1>
                    <p className="text-[#6C6C6C] text-base mt-3 lg:w-[65%]">Discover the seamless journey to skill enhancement with our platform. From enrollment to mastery, our user-friendly process ensures an enriching experience. Explore curated courses, engage in interactive learning, and track your progress effortlessly. Join us on the path to success</p>

                    <div className="mt-5">
                        <div className="lg:w-[40rem] h-[5.4rem] rounded-2xl bg-white shadow-sm flex items-center gap-5 pl-5">
                            <img src={person} alt="" />
                            <div>
                                <p className="text-[#FB9C46] text-lg">Find a tutor</p>
                                <p className="text-xs text-[#393939]">Choose your ideal teacher from over 10,000 qualified language tutors.</p>
                            </div>
                        </div>
                        <div className="lg:w-[40rem] mt-6 h-[5.4rem] rounded-2xl bg-white shadow-sm flex items-center gap-5 pl-5">
                           <div className="w-[2.8125rem] h-[2.8125rem] rounded-[50%] bg-[#FB9C46] flex justify-center items-center">
                            <img src={calendar} alt="" />

                           </div>
                            <div>
                                <p className="text-[#FB9C46] text-lg">Book a lesson</p>
                                <p className="text-xs text-[#393939]">Select a lesson time and add it to their calendar.</p>
                            </div>
                        </div>
                        <div className="lg:w-[40rem] mt-6 h-[5.4rem] rounded-2xl bg-white shadow-sm flex items-center gap-5 pl-5">
                           <div className="w-[2.8125rem] h-[2.8125rem] rounded-[50%] bg-[#FB9C46] flex justify-center items-center">
                            <img src={laptop} alt="" />

                           </div>
                            <div>
                                <p className="text-[#FB9C46] text-lg">Start learning</p>
                                <p className="text-xs text-[#393939]">Simple as that, you’re learning a language.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <img data-aos="flip-up" src={workbg} alt="" />
            </div>

        </div>
    );
};

export default HowItWorks;