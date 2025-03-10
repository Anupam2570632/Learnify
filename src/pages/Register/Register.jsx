import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import Lottie from 'lottie-react';
import registerGif from '../../../public/register.json'
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider'
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const [show, setShow] = useState(false)
    const { createUser, updateUser, logOut } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const axiosPublic = useAxiosPublic()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        setError('')
        setLoading(true)
        // console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        const user = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL,
                            contactNumber: data.number,
                            role: 'student'
                        }

                        axiosPublic.post('/users', user)
                            .then(res => console.log(res.data))
                        // console.log('update user success')
                        logOut()
                            .then()
                            .catch()
                        setLoading(false)
                        toast.success('Account created successfully!');
                        navigate('/login')
                    })
                // console.log(result.user)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                setError(err.message)
            })
    }


    return (
        <div className="flex gap-6 py-6 md:py-16 items-center flex-col md:flex-row w-11/12 md:w-4/5 mx-auto h-full">
            <div className="md:w-1/2">
                <Lottie animationData={registerGif} />
            </div>
            <div className="md:w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign Up Now!
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input {...register("name", { required: true })} name="name" label="Your Name" type="text" size="lg" />
                        <Input {...register("email", { required: true })} name="email" label="Your Email" type="email" size="lg" />
                        <Input {...register("photoURL", { required: true })} name="photoURL" label="Photo URL" type="text" size="lg" />
                        <Input {...register("number", { required: true })} name="number" label="Contact Number" type="tel" size="lg" />
                        <div className="relative">
                            <Input {...register("password", { required: true })} name="password" required label="Password" type={show ? "text" : "password"} size="lg" />
                            {
                                show ?
                                    <FaRegEyeSlash onClick={() => setShow(false)} className="absolute right-4 text-xl top-[14px]"></FaRegEyeSlash>
                                    :
                                    <FaRegEye onClick={() => setShow(true)} className="absolute right-4 text-xl top-[14px]"></FaRegEye>
                            }
                        </div>
                        {/* {
                            passwordError && <div>
                                <p className="text-red-700 text-[14px] font-bold">{passwordError}</p>
                            </div>
                        } */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <span
                                        className="font-medium transition-colors hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Conditions
                                    </span>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        {
                            error && <p className="text-red-600">{error}</p>
                        }
                        <Button type="submit" className="mt-6" fullWidth>
                            {loading ? <span className="loading loading-spinner loading-sm p-0 m-0 text-white "></span> : 'Sign Up'}
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={'/login'} className="font-medium text-gray-900">
                                Log In
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </div>
        </div>
    );
};

export default Register;