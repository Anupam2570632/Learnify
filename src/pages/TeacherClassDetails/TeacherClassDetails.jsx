import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import { FaCalendarDay, FaCheck, FaPlus, FaTasks, FaTimes, FaUserGraduate } from "react-icons/fa";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import swal from "sweetalert";

const TeacherClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = useState(false);

    const { data: aClass = [], isLoading, refetch } = useQuery({
        queryKey: ['teacher-class', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset } = useForm();

    const mutation = useMutation({
        mutationFn: (data) => axiosSecure.post(`/classes/${id}/assignments`, data),
        onSuccess: () => {
            refetch();
            reset();
            setOpen(false);
            swal({
                title: "Assignment added Successfully!",
                icon: "success",
                timer: 1500,
            });
        },
        onError: (error) => {
            console.error("Error adding assignment:", error);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const today = new Date().toISOString().split('T')[0];

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center py-4">{aClass[0].title}</h1>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body flex items-center">
                            <FaUserGraduate className="text-4xl mr-4" />
                            <div>
                                <h2 className="card-title">Total Enrollment</h2>
                                <p className="text-3xl">{aClass[0]?.total_enrollment || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body flex items-center">
                            <FaTasks className="text-4xl mr-4" />
                            <div>
                                <h2 className="card-title">Total Assignments</h2>
                                <p className="text-3xl">{aClass[0]?.total_assignments || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body flex items-center">
                            <FaCalendarDay className="text-4xl mr-4" />
                            <div>
                                <h2 className="card-title">Per Day Submissions</h2>
                                <p className="text-3xl">{aClass[0]?.per_day_submissions || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button color="blue" onClick={() => setOpen(true)} className="flex items-center">
                        <FaPlus className="mr-2" />
                        Create Assignment
                    </Button>
                    <Dialog open={open} handler={setOpen}>
                        <DialogHeader>Create Assignment</DialogHeader>
                        <DialogBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block mb-2">Assignment Title</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        {...register('title', { required: true })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Assignment Deadline</label>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                        {...register('deadline', { required: true })}
                                        min={today}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Assignment Description</label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        {...register('description', { required: true })}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="button" color="red" onClick={() => setOpen(false)} className="flex items-center mr-2">
                                        <FaTimes className="mr-2" />
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="green" className="flex items-center">
                                        <FaCheck className="mr-2" />
                                        Add Assignment
                                    </Button>
                                </div>
                            </form>
                        </DialogBody>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TeacherClassDetails;
