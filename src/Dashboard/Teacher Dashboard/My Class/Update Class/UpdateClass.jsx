import { useNavigate, useParams } from "react-router-dom";
import useClass from "../../../../Hooks/useClass";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const UpdateClass = () => {
    const {id} = useParams()
    const [classs, refetch] = useClass();
    console.log(classs)
    const classData = classs.find(item=>item._id===id)
    console.log(classData)
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        const updateData = {
            name: data.name,
            email: data.email,
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image,
        }

        const updateRes = await axiosSecure.patch(`/addclasses/${classData?._id}`, updateData);
        console.log(updateRes.data)
        if(updateRes.data.modifiedCount > 0){
            //
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Information Updated",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/myclass')
        }
        
         
    }


    
    return (
        <div className="w-[90vw] mx-auto mt-20">
        <div className="w-[70vw] mx-auto">
            <h1 className="text-black text-center text-[2.5rem] font-semibold">Update Classe</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* title input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Class Title</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="title" id="" placeholder="Class Title" {...register("title", { required: true })} defaultValue={classData?.title} />

                {errors.title && <span>This field is required</span>}

                {/* name input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Name</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="name" id="" placeholder="Your name" {...register("name", { required: true })} readOnly defaultValue={classData?.name}/>

                {errors.name && <span>This field is required</span>}
                

                {/* email input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Email</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="email" name="email" id="" placeholder="Your email" {...register("email", { required: true })} defaultValue={classData?.email} readOnly/>

                {errors.email && <span>This field is required</span>}

                {/* price input  */}
                <p className="text-[#444] mt-5 text-xl font-semibold">Price</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="number" name="price" id="" placeholder="Enter Price" {...register("price", { required: true })} defaultValue={classData?.price} />
                
                {errors.price && <span>This field is required</span>}

                {/* Description input  */}

                <p className="text-[#444] mt-5 text-xl font-semibold">Description</p>

                <input className="w-full mt-2 h-[6.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="description" id="" placeholder="Enter Description" {...register("description", { required: true })} defaultValue={classData?.description} />

                {errors.description && <span>This field is required</span>}
                {/* Image input  */}

                <p className="text-[#444] mt-5 text-xl font-semibold">Image</p>

                <input className="w-full mt-2 h-[3.5rem] text-gray-700 placeholder:text-[#A1A1A1] text-lg outline-none pl-[1.81rem] rounded-lg border-2 border-[#D0D0D0] bg-white" type="text" name="image" id="" placeholder="Enter Image" {...register("image", { required: true })} defaultValue={classData?.image} />
                {errors.image && <span>This field is required</span>}
                <input className="w-full mt-5 h-[3.5rem] btn btn-neutral border-none bg-[#D1A054B3] text-white text-xl font-bold" type="submit" id="" value="Update Class" />






            </form>


        </div>

    </div>
    );
};

export default UpdateClass;