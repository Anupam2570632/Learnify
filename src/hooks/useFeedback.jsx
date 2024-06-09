import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFeedback = () => {
    const axiosPublic = useAxiosPublic()
    const { data: feedback=[], isPending } = useQuery({
        queryKey: ['allFeedback'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback')
            return res.data
        }
    })

    return { feedback }
};

export default useFeedback;