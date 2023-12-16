import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import faqbg from "../../../assets/images/faq.png"

const FAQ = () => {
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <div className="flex justify-between items-center mx-[8%] mt-20 flex-col lg:flex-row">
            <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="w-[23rem] h-[23rem] bg-[#efd8c9a2] rounded-[3rem] relative">
                <img className="md:w-[27rem] md:h-[30rem]  absolute md:-top-28" src={faqbg} alt="" />
            </div>

           <div
     data-aos-anchor-placement="bottom-bottom" className="lg:w-[50vw]">
        <h1 className="text-[#393939] text-[2rem] font-semibold">What Will You <span className="text-[#FB9C46]">Get</span> ?</h1>
           <Accordion open={open === 1} className="mb-2 rounded-lg border mt-8 border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                        }`}
                >
                How do I enroll in a class?
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                To enroll in a class, first, sign in to your account. Browse through the available classes, select the one you&apos;re interested in, and click on the Enroll button. Follow the prompts to complete the enrollment process. If the class requires payment, you can securely make the transaction through our platform.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className={`border-b-0 transition-colors ${open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
                        }`}
                >
                    Can I access my enrolled classes from different devices?
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                Yes, you can access your enrolled classes from any device with internet connectivity. Simply log in to your account, and you&apos;ll find your classes listed in your dashboard. Whether you&apos;re using a computer, tablet, or smartphone, your learning progress will be synced across all devices.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                        }`}
                >
                    How can I track my progress in a class?
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                Track your progress easily within each class. We provide features like progress tracking, quizzes, and assignments. Your completed lessons and achievements will be visible in your class dashboard. Additionally, you can view your overall course progress and achievements in your user profile.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} className="rounded-lg border border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                        }`}
                >
                    What if I face technical issues during a live session or with course materials?
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                If you encounter technical issues, don&apos;t worry! Reach out to our support team through the Help Center or Contact Us section. Our dedicated support team will assist you in resolving any technical challenges you may face during live sessions or with course materials. We are committed to ensuring a smooth learning experience for all our users.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} className="rounded-lg border border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                        }`}
                >
                   How do I communicate with my instructor or fellow students within a class?
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                Communication is key to a collaborative learning experience. In each class, you wll find discussion forums, chat features, and possibly live Q&A sessions. Use these platforms to interact with your instructor and fellow students. You can ask questions, participate in discussions, and seek clarification on course content. Stay engaged and make the most out of the interactive features available in each class.
                </AccordionBody>
            </Accordion>
           </div>

        </div>
    );
};

export default FAQ;