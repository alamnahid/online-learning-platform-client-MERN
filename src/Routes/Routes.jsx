import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home Pages/Home";
import AllClasses from "../Pages/All Classes/AllClasses";
import SignUp from "../Pages/SignUp & Login/SignUp";
import Login from "../Pages/SignUp & Login/Login";
import TechTOLetsSkillUp from "../Pages/Tech To LetsSkillUp/TechTOLetsSkillUp";
import StudentDashboard from "../Dashboard/StudentDashboard/StudentDashboard";
import Dashboard from "../Dashboard/Dashboard";
import ClassDetails from "../Components/Class Details/ClassDetails";
import AllUsers from "../Dashboard/Admin Dashboard/AllUsers";
import TeacherRequest from "../Dashboard/Admin Dashboard/Teacher Request/TeacherRequest";
import AddClasses from "../Dashboard/Teacher Dashboard/AddClasses";
import MyClass from "../Dashboard/Teacher Dashboard/My Class/MyClass";
import AllClassesAdmin from "../Dashboard/Admin Dashboard/All Classes/AllClassesAdmin";
import MyEnrollClasses from "../Dashboard/StudentDashboard/MyEnrollClasses/MyEnrollClasses";
import UpdateClass from "../Dashboard/Teacher Dashboard/My Class/Update Class/UpdateClass";
import ClassDetailsTeacher from "../Dashboard/Teacher Dashboard/Class Details/ClassDetailsTeacher";
import Payment from "../Dashboard/StudentDashboard/Payment/Payment";
import EnrollClassDetails from "../Dashboard/StudentDashboard/EnrollClass Details/EnrollClassDetails";
import PrivateRoutes from "./PrivateRoutes";
import StudentProfile from "../Dashboard/StudentDashboard/Student Profile/StudentProfile";
import TeacherProfile from "../Dashboard/Teacher Dashboard/TeacherProfile/TeacherProfile";
import AdminClassDetails from "../Dashboard/Admin Dashboard/All Classes/Class Details Adminn/AdminClassDetails";
import AdminProfile from "../Dashboard/Admin Dashboard/Admin Profile/AdminProfile";
import ErrorElement from "../Components/Error Page/ErrorElement";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorElement/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/all-classes',
                element: <AllClasses/>
            },
            {
                path: '/all-classes/:id',
                element: <PrivateRoutes><ClassDetails/></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/addclasses/adminroute/approved/${params.id}` , {credentials: 'include'} )
            },
            {
                path: '/payment/:id',
                element: <PrivateRoutes><Payment/></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/addclasses/adminroute/approved/${params.id}`, {credentials: 'include'} )
            },
            {
                path: '/techto-letsskillup',
                element: <PrivateRoutes><TechTOLetsSkillUp/></PrivateRoutes>
            }
            
        ]
    },
    {
        path: 'signup',
        element: <SignUp/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
        errorElement: <ErrorElement/>,
        children: [
            // student dashbaord
            {
                path: 'student-dashboard',
                element: <StudentDashboard/>
            },
            {
                path: 'enroll-classes',
                element: <MyEnrollClasses/>,
                loader: ()=>fetch('http://localhost:5000/addclasses/adminroute/approved')
            },
            {
                path: 'enroll-classes/:id',
                element: <EnrollClassDetails/>,
                loader: ({params})=> fetch(`http://localhost:5000/addclasses/adminroute/approved/${params.id}`)
            },
            {
                path: 'student-profile',
                element: <StudentProfile/>
            },

            //admin dashbaord
            {
                path: 'users',
                element: <AdminRoutes><AllUsers/></AdminRoutes>
            },
            {
                path: 'teacher-request',
                element: <AdminRoutes><TeacherRequest/></AdminRoutes>
            },
            {
                path: 'classes',
                element: <AdminRoutes><AllClassesAdmin/></AdminRoutes>
            },
            {
                path: 'classes/:id',
                element: <AdminClassDetails/>,
                loader: ({params})=> fetch(`http://localhost:5000/addclasses/adminroute/approved/${params.id}`)
            },
            {
                path: 'admin-profile',
                element: <AdminRoutes><AdminProfile/></AdminRoutes>

            },

            // teacher dashboard

            {
                path: 'addclass',
                element: <PrivateRoutes><AddClasses/></PrivateRoutes>
            },
            {
                path: 'myclass',
                element: <PrivateRoutes><MyClass/></PrivateRoutes>
            },
            {
                path: 'update-class/:id',
                element: <UpdateClass/>
            },
            {
                path: 'myclass/:id',
                element: <ClassDetailsTeacher/>,
                loader: ({params})=> fetch(`http://localhost:5000/addclasses/adminroute/approved/${params.id}`)
            },
            {
                path: 'teacher-profile',
                element: <PrivateRoutes><TeacherProfile/></PrivateRoutes>
            },

        ]
    }
]);
export default router;