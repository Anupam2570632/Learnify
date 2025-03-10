import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import {
  FaCalendarDay,
  FaCheck,
  FaPlus,
  FaTasks,
  FaTimes,
  FaUserGraduate,
} from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import swal from "sweetalert";

const TeacherClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [openAssignment, setAssignmetnOpen] = useState(false);
  const [openQuiz, setQuizOpen] = useState(false);

  const {
    data: aClass = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacher-class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?id=${id}`);
      return res.data;
    },
  });

  const { data: assignmentStat = [], isPending: statPending } = useQuery({
    queryKey: ["assignment-stat", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission-data/${id}`);
      return res.data;
    },
  });
  const {
    data: totalAssignment = [],
    isPending: dayPending,
    refetch: totalRefetch,
  } = useQuery({
    queryKey: ["total-assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments-count/${id}`);
      return res.data;
    },
    refetchOnMount: true,
  });

  // console.log(assignmentStat, totalAssignment)

  const { register: registerAssignment, handleSubmit: handleSubmitAssignment, reset: resetAssignment } = useForm();
  const { register: registerQuiz, handleSubmit: handleSubmitQuiz, reset: resetQuiz } = useForm();

  const mutationAssignment = useMutation({
    mutationFn: (data) => axiosSecure.post(`/classes/${id}/assignments`, data),
    onSuccess: () => {
      refetch();
      resetAssignment();
      totalRefetch();
      setAssignmetnOpen(false);
      swal({
        title: "Assignment added Successfully!",
        icon: "success",
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error adding assignment:", error);
    },
  });

  const onSubmitAssignment = (data) => {
    mutationAssignment.mutate(data);
  };


  const mutationQuiz = useMutation({
    mutationFn: (data) => axiosSecure.post(`/classes/${id}/quizes`, data),
    onSuccess: () => {
      resetQuiz();
      setAssignmetnOpen(false);
      swal({
        title: "Quiz added Successfully!",
        icon: "success",
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error adding quiz:", error);
    },
  });

  const onSubmitQuiz=(data)=>{
    mutationQuiz.mutate(data);
  }


  const today = new Date().toISOString().split("T")[0];

  if (isLoading || statPending || dayPending) {
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
                <p className="text-3xl w-full text-center">
                  {aClass[0]?.total_enrollment || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body flex items-center">
              <FaTasks className="text-4xl mr-4" />
              <div>
                <h2 className="card-title">Total Assignments</h2>
                <p className="text-3xl w-full text-center">
                  {totalAssignment.totalAssignments}
                </p>
              </div>
            </div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body flex items-center">
              <FaCalendarDay className="text-4xl mr-4" />
              <div>
                <h2 className="card-title">Per Day Submissions</h2>
                <p className="text-3xl w-full text-center">
                  {parseFloat(assignmentStat.submissionsPerDate).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* quiz and assignment center */}
        <div className="flex items-center gap-6">
          <div>
            <Button
              color="blue"
              onClick={() => setAssignmetnOpen(true)}
              className="flex items-center"
            >
              <FaPlus className="mr-2" />
              Create Assignment
            </Button>
            <Dialog open={openAssignment} handler={setAssignmetnOpen}>
              <DialogHeader>Create Assignment</DialogHeader>
              <DialogBody>
                <form onSubmit={handleSubmitAssignment(onSubmitAssignment)}>
                  <div className="mb-4">
                    <label className="block mb-2">Assignment Title</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      {...registerAssignment("title", { required: true })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Assignment Deadline</label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      {...registerAssignment("deadline", { required: true })}
                      min={today}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Assignment Description</label>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      {...registerAssignment("description", { required: true })}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      color="red"
                      onClick={() => setAssignmetnOpen(false)}
                      className="flex items-center mr-2"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="green"
                      className="flex items-center"
                    >
                      <FaCheck className="mr-2" />
                      Add Assignment
                    </Button>
                  </div>
                </form>
              </DialogBody>
            </Dialog>
          </div>
          <div>
            <Button
              color="blue"
              onClick={() => setQuizOpen(true)}
              className="flex items-center"
            >
              <FaPlus className="mr-2" />
              Create Quiz
            </Button>
            <Dialog open={openQuiz} handler={setQuizOpen}>
              <DialogHeader>Create Quiz</DialogHeader>
              <DialogBody>
                <form onSubmit={handleSubmitQuiz(onSubmitQuiz)}>
                  <div className="mb-4">
                    <label className="block mb-2">Quiz Title</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Quiz title"
                      {...registerQuiz("quizTitle", { required: true })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Quiz Time</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      {...registerQuiz("quizTime", { required: true })}
                      placeholder="time in minutes"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Quiz JSON data</label>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      {...registerQuiz("questionJson", { required: true })}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      color="red"
                      onClick={() => setQuizOpen(false)}
                      className="flex items-center mr-2"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="green"
                      className="flex items-center"
                    >
                      <FaCheck className="mr-2" />
                      Add Quiz
                    </Button>
                  </div>
                </form>
              </DialogBody>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetails;
