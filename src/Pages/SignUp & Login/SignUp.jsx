import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {

  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.form?.pathname || "/";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate } = useMutation({
    mutationKey: ['food'],
    mutationFn: (addingData) => {
      return axios.post('http://localhost:5000/users', addingData, { withCredentials: true, })
    },
    onSuccess: () => {
      
    }

  })

  const onSubmit = async (data) => {
    console.log(data)
   

    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        toast.success('User Created successfully');
        updateUserProfile(data.name, data.image)
          .then((() => {
            mutate({
              name: data.name,
              email: data.email,
              photo: data.image
            })
            navigate(from, { replace: true })
            reset()
          }))
      })
      .catch(error => {
        toast.error(error.message)

      })
  }

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        toast.success('User Created successfully');
        mutate({
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
        })
        navigate(from, { replace: true })
      })
      .catch(error => {
        toast.error(error.message)
      })
  }


  return (
    <div className="flex justify-evenly items-center mt-12 flex-col lg:flex-row">
      <img src="https://i.ibb.co/mS89dpC/E9-Tta-Yg-KZu.gif" alt="" />
      <div className="md:w-[28rem]">
        <h1 className="text-black text-center text-[2.5rem] font-semibold">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <p className="text-[#444] mt-5 text-xl font-semibold">Name</p>

          <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="name" id="" placeholder="Your name" {...register("name", { required: true })} />

          {errors.name && <span>This field is required</span>}

          <p className="text-[#444] mt-5 text-xl font-semibold">Photo</p>
          <div>
            <input type="text" {...register("image", { required: true })} name="image" placeholder="Enter Photo URL" className="file-input file-input-bordered  w-full mt-2 px-4 h-[3.5rem]" />
          </div>

          {errors.image && <span>This field is required</span>}

          <p className="text-[#444] mt-5 text-xl font-semibold">Email</p>

          <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="email"  name="email" id="" placeholder="Type here" {...register("email", { required: true })} />

          <p className="text-[#444]  text-xl mt-4 font-semibold">Password</p>

          <input
            className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white"
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must not exceed 20 characters',
              },
              validate: (value) => {
                // Additional custom validation
                if (!/[A-Z]/.test(value)) {
                  return 'Password must contain at least one uppercase letter';
                }

                if (!/[!@#$%^&*()_+[\]{}|;:'",.<>?]/.test(value)) {
                  return 'Password must contain at least one special character';
                }

                return true; // Validation passed
              },
            })}
          />

          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}


          <input className="w-full mt-5 h-[3.5rem] btn btn-neutral border-none bg-[#FB9C46] text-white text-xl font-bold" type="submit" id="" value="Sign Up" />

          <p className="text-[#FB9C46] mt-5 text-center text-xl font-medium">Already have an account? <Link to='/login'><span className="font-bold">Log in</span></Link></p>

          <p className="text-[#444] mt-5 text-xl font-medium text-center">Or sign in with</p>

          <div className="flex items-center justify-center gap-14 mt-5">

            <div onClick={handleGoogleSignIn} className="w-[18.25rem] rounded-3xl bg-[#FB9C46] cursor-pointer btn-neutral h-[3.25rem]  flex gap-2 justify-center items-center ">
              <FaGoogle className="text-white text-2xl" />
              <p className="text-white text-lg font-bold">Continue With Google</p>
            </div>


          </div>
        </form>


      </div>
    </div>
  );
};

export default SignUp;