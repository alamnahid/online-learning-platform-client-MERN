import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddClasses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    const { user } = useContext(AuthContext);
    console.log(user)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate } = useMutation({
        mutationKey: ['food'],
        mutationFn: (addingData) => {
          return axios.post('http://localhost:5000/addclasses', addingData, { withCredentials: true, })
        },
        onSuccess: () => {
          Swal.fire({
            title: "Successfully Requesst Sent",
            text: "Wait for admin approval",
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/dashboard/myclass')
            }
          });
        }
    
      })

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type' : 'multipart/form-data'
            }
        })
        if(res.data.success){

          mutate({
              name: data.name,
              email: user.email,
              title: data.title,
              price: data.price,
              description: data.description,
              image: res.data.data.display_url,
              status: 'pending',
              enrollCount: 0
  
  
            })
        }

         
    }
    return (
        <div className=" mt-20">
        <div className="w-[90vw] lg:w-[70vw] mx-auto">
            <h1 className="text-black text-center text-[2.5rem] font-semibold">Add Classes</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* title input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Class Title</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="title" id="" placeholder="Class Title" {...register("title", { required: true })} />
                {errors.title && <span>This field is required</span>}

                {/* name input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Name</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="name" id="" placeholder="Your name" {...register("name", { required: true })} readOnly defaultValue={user?.displayName}/>
                

                {/* email input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Email</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="email" name="email" id="" placeholder="Your email" {...register("email", { required: true })} defaultValue={user?.email} readOnly/>

                {/* price input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Price</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="number" name="price" id="" placeholder="Enter Price" {...register("price", { required: true })} />


                {/* Description input  */}

                <p className="text-[#444] mt-5 text-xl font-semibold">Description</p>

                <input className="w-full mt-2 h-[6.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="description" id="" placeholder="Enter Description" {...register("description", { required: true })} />
                {errors.description && <span>This field is required</span>}

                {/* Image input  */}

                <p className="text-[#444] mt-5 text-xl font-semibold">Image</p>

                <input type="file" {...register("image", {required: true})} className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-5" />
                {errors.image && <span>This field is required</span>}

                <input className="w-full mt-5 h-[3.5rem] btn btn-neutral border-none bg-[#FB9C46] text-white text-xl font-bold" type="submit" id="" value="Add Class" />






            </form>


        </div>

    </div>
    );
};

export default AddClasses;