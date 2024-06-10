import {
    CardHeader, CardBody, CardFooter, Typography, Input, Button, Textarea
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: (aClass) => {
            const setClass = {
                ...aClass,
                total_enrollment: 0
            }
            return axiosSecure.post('/classes', setClass);
        },
        onSuccess: () => {
            // Handle successful mutation
            // console.log("Class added successfully");
            swal({
                title: "Class Added Successfully!",
                icon: "success",
                timer: 1500,
            });
            setLoading(false)
            navigate('/dashboard/myClass')
        },
        onError: (error) => {
            // Handle error during mutation
            console.error("Error adding class:", error);
        }
    });

    const onSubmit = (data) => {
        setLoading(true)
        // Submit class data to MongoDB
        // console.log(data);
        const aClass = {
            ...data,
            status: 'pending'
        }
        mutation.mutate(aClass);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[900px] mx-auto md:px-20">
            <CardHeader
                variant="gradient"
                className="mb-4 grid bg-[#002244] h-28 place-items-center"
            >
                <Typography variant="h3" color="white">
                    Add Class
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <div className="md:flex md:flex-row md:gap-4 space-y-4 md:space-y-0">
                    <Input
                        color="blue"
                        {...register("title", { required: true })}
                        required
                        label="Title"
                        type="text"
                        size="lg"
                        className="w-full"
                    />
                    <Input
                        color="blue"
                        {...register("name", { required: true })}
                        required
                        label="Name"
                        defaultValue={user?.displayName}
                        readOnly
                        type="text"
                        size="lg"
                        className="w-full"
                    />
                </div>
                <div className="md:flex md:flex-row md:gap-4 space-y-4 md:space-y-0">
                    <Input
                        color="blue"
                        {...register("email", { required: true })}
                        required
                        defaultValue={user?.email}
                        readOnly
                        label="Email"
                        type="email"
                        size="lg"
                        className="mw-full"
                    />
                    <Input
                        color="blue"
                        {...register("price", { required: true })}
                        required
                        label="Price"
                        type="text"
                        size="lg"
                        className="w-full"
                    />
                </div>
                <Textarea
                    color="blue"
                    {...register("description", { required: true })}
                    required
                    label="Description"
                    rows="5"
                    className="w-full px-3 py-2 border rounded-md"
                />
                <Input
                    color="blue"
                    {...register("image", { required: true })}
                    required
                    label="Image"
                    type="text"
                    size="lg"
                />
            </CardBody>
            <CardFooter className="pt-0">
                <Button type="submit" className="mt-6 bg-[#002244]" fullWidth>
                    {loading ? <span className="loading loading-spinner loading-sm p-0 m-0 text-white "></span> : 'Add Class'}
                </Button>
            </CardFooter>
        </form>
    );
};

export default AddClass;
