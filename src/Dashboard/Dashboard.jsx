import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { MdOutlineLogout } from "react-icons/md";



const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();
    const { user, logOut } = useContext(AuthContext)
    const handlelogOut = () => {
        logOut()
      }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <label htmlFor="my-drawer-2" className="btn bg-[#ff891b] border-none text-white w-full btn-primary drawer-button lg:hidden">Open Dashboards</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" p-4 w-80 min-h-full bg-base-200 text-base-content bg-gradient-to-r from-[#EFD8C9]">
                    <li className="flex flex-col justify-center items-center">
                        {
                            user?.photoURL ? <img className="w-[10rem] border-2 border-orange-400  h-[9rem] rounded-[50%]" src={user?.photoURL} alt="" />
                            :
                            <img className="w-[10rem]  h-[9rem] rounded-[50%]" src="https://i.ibb.co/b7TTqxP/avatar.png" alt="" />
                        }
                        <h1 className="text-xl text-center mt-4 font-semibold">Welcome, <span className="text-[#ff891b] text-left">{user?.displayName}</span> </h1>
                    </li>

                    {
                        isAdmin ? <>

                            <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/teacher-request">Teacher Request</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/users">Users</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/classes">All Classes</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/admin-profile">Profile</NavLink></li>

                        </>



                            :

                            isTeacher ? <>
                                <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/addclass">Add Class</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/myclass">My Class</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/teacher-profile">Profile</NavLink></li>

                            </>

                                :
                                <>
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-8' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/enroll-classes"> My Enroll Class</NavLink></li>
                                    <li><NavLink className={({ isActive }) =>
                                        isActive ? 'font-bold btn w-full text-white text-lg bg-[#FB9C46] hover:text-black hover:bg-white mt-3' : 'font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-3 border-2 hover:bg-white hover:rounded-tr-3xl'
                                    } to="/dashboard/student-profile">Profile</NavLink></li>

                                </>
                    }


                    <div className="divider"></div>

                    <li><NavLink className="font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl " to="/"> Home</NavLink></li>
                    <li><NavLink className="font-semibold text-xl btn btn-outline border-[#FB9C46] hover:text-black w-full mt-8 border-2 hover:bg-white hover:rounded-tr-3xl " to="/all-classes"> All Classes</NavLink></li>


                    <Link to='/login' onClick={handlelogOut}><li className="absolute flex items-center gap-2 text-2xl font-bold bottom-8 left-8"><MdOutlineLogout/> Logout</li></Link>



                </ul>

            </div>
        </div>
    );
};

export default Dashboard;