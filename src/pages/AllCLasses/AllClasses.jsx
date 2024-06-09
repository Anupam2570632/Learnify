import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useClasses from "../../hooks/useClasses";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingPage from '../../components/LoadingPage'; // Add this import
import useStat from "../../hooks/useStat";

const AllClasses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const pageSize = 6;

    const [stat, isPending] = useStat()

    const [classes, refetch, classPending] = useClasses(currentPage, pageSize, search);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchValue); // Set the search value when the form is submitted
        setCurrentPage(1); 
    };

    useEffect(() => {
        refetch();
    }, [search, currentPage]); // Refetch data when search or pagination changes

    const totalPages = Math.ceil(stat.classCount / 6);

    if (classPending || isPending) {
        return <LoadingPage />;
    }

    return (
        <div>
            <form onSubmit={handleSearch} className="my-10 max-w-[330px] mx-auto flex items-center gap-2">
                <Input
                    type="text"
                    label="Search by class name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </form>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 md:w-4/5 mx-auto">
                {
                    classes.map((aClass, idx) => (
                        <div
                            className="max-w-[380px] w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
                            key={idx}
                        >
                            <img src={aClass.image} alt={aClass.title} className="w-full h-48 object-cover" />
                            <div className="p-4 space-y-4 flex flex-col">
                                <div className="space-y-4">
                                    <h1 className="text-[18px] font-bold text-gray-800">{aClass.title}</h1>
                                    <h1 className="text-gray-600">{aClass.name}</h1>
                                    <h1 className="text-lg font-semibold text-gray-800">Price : ${aClass.price}</h1>
                                    <h1 className="text-gray-600">Enrolled Students: {aClass.total_enrollment}</h1>
                                    <div className="divider"></div>
                                    <h2 className="italic text-gray-600">
                                        {aClass.description.length > 60
                                            ? `${aClass.description.slice(0, 60)}...`
                                            : aClass.description}
                                    </h2>
                                    <div className="divider"></div>
                                </div>
                                <div className="flex-1 h-full flex items-center justify-center">
                                    <Link className="w-full" to={`/classDetails/${aClass._id}`}>
                                        <button className="px-4 py-2 rounded-full bg-cyan-600 btn-block text-white font-bold hover:bg-cyan-700">
                                            Enroll
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center gap-4 justify-center my-10">
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </IconButton>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                    <ArrowRightIcon className="h-6 w-6" />
                </IconButton>
            </div>
        </div>
    );
};

export default AllClasses;
