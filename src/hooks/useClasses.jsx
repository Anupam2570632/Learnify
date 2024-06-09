import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = (page, size, search) => {
    const axiosSecure = useAxiosSecure();

    const { isPending: classPending, data: classes = [], refetch } = useQuery({
        queryKey: ['allClasses', page, size, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?page=${page}&size=${size}&search=${search}`);
            return res.data;
        },
    });

    return [classes, refetch, classPending];
};

export default useClasses;
