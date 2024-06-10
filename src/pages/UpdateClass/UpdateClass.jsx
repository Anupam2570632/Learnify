import {
    CardHeader, CardBody, CardFooter, Typography, Input, Button, Textarea
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const UpdateClass = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    // console.log(id)
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const mutation = useMutation({
        mutationFn: (updatedClass) => {
            // Send PUT request with the updated class data
            return axiosSecure.put(`/class/${id}`, updatedClass);
        },
        onSuccess: () => {
            swal({
                title: "Class Updated Successfully!",
                icon: "success",
                timer: 1500,
            });
            setLoading(false)
            navigate('/dashboard/myClass')
            refetch()
        },
        onError: (error) => {
            console.error("Error updating class:", error);
        }
    });

    const { data: aClass, isPending, refetch } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`);
            return res.data;
        }
    });

    if (isPending) {
        return <LoadingPage />;
    }

    const onSubmit = (data) => {
        setLoading(true)
        const updatedClass = {
            ...data,
            total_enrollment: aClass[0].total_enrollment,
            status: aClass[0].status 
        };
        mutation.mutate(updatedClass);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[900px] mx-auto md:px-20">
            <CardHeader
                variant="gradient"
                className="mb-4 grid bg-[#002244] h-28 place-items-center"
            >
                <Typography variant="h3" color="white">
                    Update Class
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <div className="md:flex md:flex-row md:gap-4 space-y-4 md:space-y-0">
                    <Input
                        color="blue"
                        defaultValue={aClass[0].title}
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
                        className="w-full"
                    />
                    <Input
                        color="blue"
                        defaultValue={aClass[0].price}
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
                    defaultValue={aClass[0].description}
                    {...register("description", { required: true })}
                    required
                    label="Description"
                    rows="5"
                    className="w-full px-3 py-2 border rounded-md"
                />
                <Input
                    color="blue"
                    defaultValue={aClass[0].image}
                    {...register("image", { required: true })}
                    required
                    label="Image"
                    type="text"
                    size="lg"
                />
            </CardBody>
            <CardFooter className="pt-0">
                <Button type="submit" className="mt-6 bg-[#002244]" fullWidth>
                    {loading ? <span className="loading loading-spinner loading-sm p-0 m-0 text-white "></span> : 'Update Class'}
                </Button>
            </CardFooter>
        </form>
    );
};

export default UpdateClass;
