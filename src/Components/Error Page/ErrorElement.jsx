import { useNavigate, useRouteError } from "react-router-dom";
import errorimg from "../../assets/images/404_animation.gif"

const ErrorElement = () => {
    const error = useRouteError();
    const navigate = useNavigate()

    const handlebackhome = ()=>{
        navigate('/')
    }
    return (
        <div>
            <div className="mt-24">
           <p className="text-xl font-medium text-center">{error.statusText || error.message}</p>

           <p className="text-2xl font-medium text-center">
            {
                error.status === 404 && <div>
                    
                    <button onClick={handlebackhome} className='mt-5 border-none text-white w-[16rem] bg-[#F45E0C] mt-14- h-12'>Back to Home Page</button>

                   <div className="flex justify-center items-center mt-20">
                   <img src={errorimg} alt="" />
                   </div>
                    
                </div>
            }
           </p>
           </div>
        </div>
    );
};

export default ErrorElement;