import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
    const axiosSecure = useAxiosSecure()
    const { isPending, data: classes = [], refetch } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes')
            return res.data;
        },
    })

    

    return [classes, refetch]
};

export default useClasses;