import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStat = () => {
    const axiosPublic = useAxiosPublic()
    const { data: stat = [], isPending } = useQuery({
        queryKey: ['laernify-stat'],
        queryFn: async () => {
            const res = await axiosPublic.get('/learnify-stat')
            return res.data
        }
    })

    return [stat, isPending]
};

export default useStat;