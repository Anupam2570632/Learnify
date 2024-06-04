import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTeacher = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isTeacher, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
            return res.data?.teacher;
        }
    })
    return [isTeacher, isAdminLoading]
};

export default useTeacher;