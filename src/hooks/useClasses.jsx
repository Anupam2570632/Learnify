import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = (page=1, size=10, search='', status='') => {
    const axiosSecure = useAxiosSecure();

    const { isPending: classPending, data: classes = [], refetch } = useQuery({
        queryKey: ['allClasses', page, size, search, status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?page=${page}&size=${size}&search=${search}&status=${status}`);
            return res.data;
        },
    });

    return [classes, refetch, classPending];
};

export default useClasses;
