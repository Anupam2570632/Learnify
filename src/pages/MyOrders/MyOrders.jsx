import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch order data
    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ["user-classes-order", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-classes/${user?.email}`);
            return res.data;
        }
    });

    // Generate PDF invoice
    const generateInvoice = async (order) => {
        const invoiceContent = document.getElementById("invoice-content");

        // Convert HTML to canvas
        const canvas = await html2canvas(invoiceContent);

        // Generate PDF from canvas
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
        pdf.save(`invoice_${order.transactionId}.pdf`);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching orders.</p>;
    }
    // console.log(orders)
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-center text-xl font-bold">My Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Transaction ID</th>
                        <th>Teacher Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.transactionId}>
                            <td>{order.title}</td>
                            <td>{order.price}</td>
                            <td>{order.transactionId}</td>
                            <td>{order.email}</td>
                            <td>
                                <button onClick={() => generateInvoice(order)}>Download Invoice</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
