import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (page, size, search) => {
    const axiosSecure = useAxiosSecure();

    const { isPending: userPending, data: users = [], refetch } = useQuery({
        queryKey: ['allUsers', page, size, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}&size=${size}&search=${search}`);
            return res.data;
        },
    });

    return [users, refetch, userPending];
};

export default useUsers;
