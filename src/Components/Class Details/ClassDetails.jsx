import profile from "../../assets/images/Profile.svg"
import play from "../../assets/images/Play.svg"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Link, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
const ClassDetails = () => {
    const classs = useLoaderData();
    // console.log(classs)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="">
            <Card className="w-full max-w-[80vw] mx-auto lg:pt-20  mt-[5rem] flex-col lg:flex-row gap-10">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0  shrink-0 rounded-r-none"
                >
                    <img
                        src={classs?.image}
                        alt="card-image"
                        className="h-[30rem] w-full lg:w-[40rem] object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" color="gray" className="mb-4 uppercase">
                        <div className="flex items-center gap-2 text-lg">
                            <img src={profile} alt="" />
                            <p>{classs?.enrollCount} Students</p>
                        </div>
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {classs.title}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                        {classs?.description}
                    </Typography>
                   
                    <Typography className="mb-8 font-normal flex items-center gap-3">
                        <img className="w-[4rem] h-[4rem] rounded-[50%]" src={play} alt="" />
                        <h1 className="md:text-xl font-medium">Instructor: {classs?.name}</h1>
                    </Typography>

                    <Typography className=" flex flex-col justify-start  gap-5">
                       <p className="text-[#FB9C46] font-bold text-3xl">$ {classs?.price}</p>
                      <Link to={`/payment/${classs._id}`}> <button className="btn btn-neutral bg-[#FB9C46] border-none text-white text-lg w-[9rem]">Pay</button></Link>
                    </Typography>
                    

                </CardBody>
            </Card>
        </div>
    );
};

export default ClassDetails;