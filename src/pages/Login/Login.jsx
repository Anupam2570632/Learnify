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
import registerGif from '../../../public/login.json'
import { Link} from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Login = () => {
    const [show, setShow] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="flex gap-6 py-6 md:py-16 items-center flex-col md:flex-row w-11/12 md:w-4/5 mx-auto h-full">
            <div className="md:w-1/2">
                <Lottie style={{ height: '500px' }} animationData={registerGif} />
            </div>
            <div className="md:w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Login Now!
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input {...register("email", { required: true })} name="email" required label="Your Email" type="email" size="lg" />
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
                        <Button type="submit" className="mt-6" fullWidth>
                            Login
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don&apos;t have an account?{" "}
                            <Link to={'/register'} className="font-medium text-gray-900">
                                Sign Up
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </div>
        </div>
    );
};

export default Login;