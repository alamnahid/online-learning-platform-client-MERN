
import { useContext } from "react";
import { FaUserPen } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaPhoneAlt } from "react-icons/fa";



const StudentProfile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-20">
                {
                    user?.photoURL ? <img className="h-[18rem] border-2 border-orange-500 w-[20rem] rounded-[50%]" src={user?.photoURL} alt="" />
                    :
                    <img className="h-[18rem] w-[20rem] rounded-[50%]" src="https://i.ibb.co/b7TTqxP/avatar.png" alt="" />
                }

                <h1 className="text-2xl font-bold mt-6">Hi, <span className="text-[#FB9C46]">{user?.displayName}</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 items-center mt-16">
                    <div className="w-[15rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#FB9C46] items-center flex flex-col justify-center text-center gap-5">
                        <FaUserPen className="text-[6rem] ml-8"/>

                        <p className="text-xl font-semibold">Role</p>
                        <p className="text-2xl font-semibold">Student</p>

                    </div>

                    <div className="w-[15rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#5f6fb9] items-center flex flex-col justify-center text-center gap-5">
                        <MdMarkEmailRead className="text-[6rem] ml-8"/>

                        <p className="text-xl font-semibold">Email</p>
                        <p className="text-base font-semibold">{user?.email}</p>

                    </div>

                    <div className="w-[15rem] h-[15rem]  bg-gradient-to-r from-[#EFD8C9] to-[#efd8c971] border-b-8 border-b-[#fb46ec] items-center flex flex-col justify-center text-center gap-5">
                        <FaPhoneAlt className="text-[6rem] ml-5"/>

                        <p className="text-xl font-semibold">Phone</p>
                        <p className="text-2xl font-semibold">{}</p>

                    </div>

                </div>

            </div>




        </div>
    );
};

export default StudentProfile;