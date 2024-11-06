import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage, Link } from "@inertiajs/inertia-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reservations(props) {
    const { reservation } = usePage().props;

    const { data, setData, put, errors } = useForm({
        client_id: reservation.client_id || "",
        room_id: reservation.room_id || "",
        date: reservation.date || "",
        no_days: reservation.no_days || "",
        no_persons: reservation.no_persons || "",
    });

    //alert(JSON.stringify(data)); // check object value
    //alert(JSON.stringify(props.categories)); // check object value

    // react-select with react hooks
    const [selectedOptionClient, setSelectedOptionClient] = useState(null);
    const [selectedOptionRoom, setSelectedOptionRoom] = useState(null);

    // serch in Select (DropDown Menu) an option by value and return object item for react-select
    const selectValueSearch = (options, value, tempObj = {}) => {
        if (options && value != null) {
            options.find((node) => {
                if (node.value === value) {
                    tempObj.found = node;
                    return node;
                }
                return selectValueSearch(node.options, value, tempObj);
            });
            if (tempObj.found) {
                return tempObj.found;
            }
        }
        return undefined;
    };

    // set selected value from react-select to data.category_id on form data object that will be sent to Laravel
    if (selectedOptionClient !== null) {
        data.client_id = selectedOptionClient.value;
    }

    // set selected value from react-select to data.category_id on form data object that will be sent to Laravel
    if (selectedOptionRoom !== null) {
        data.room_id = selectedOptionRoom.value;
    }

    // react-datepicker
    const [startDate, setStartDate] = useState(new Date(data.date));
    /* // set selected date value from react-datepicker to data.date on form data object that will be sent to Laravel
    if (startDate !== null) {
        data.date = startDate;
    } else {
        data.date = "";
    }
*/
    function handleSubmit(e) {
        e.preventDefault();

        put(route("reservations.update", reservation.id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit reservation
                </h2>
            }
        >
            <Head title="Reservations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("reservations.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label className="">
                                                    Client
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <Select
                                                    options={props.clients}
                                                    defaultValue={
                                                        selectedOptionClient
                                                    }
                                                    // dynamic search set value
                                                    value={selectValueSearch(
                                                        props.clients,
                                                        data.client_id
                                                    )}
                                                    onChange={
                                                        setSelectedOptionClient
                                                    }
                                                    //placeholder="Choose option..."
                                                    label="Client"
                                                    name="client_id"
                                                    errors={errors.client_id}
                                                />
                                                <span className="text-red-600">
                                                    {errors.client_id}
                                                </span>
                                            </div>
                                            <div className="col-md-4"></div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label className="">Room</label>
                                            </div>
                                            <div className="col-md-6">
                                                <Select
                                                    options={props.rooms}
                                                    defaultValue={
                                                        selectedOptionRoom
                                                    }
                                                    // dynamic search set value
                                                    value={selectValueSearch(
                                                        props.rooms,
                                                        data.room_id
                                                    )}
                                                    onChange={
                                                        setSelectedOptionRoom
                                                    }
                                                    //placeholder="Choose option..."
                                                    label="Room"
                                                    name="room_id"
                                                    errors={errors.room_id}
                                                />
                                                <span className="text-red-600">
                                                    {errors.room_id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Date</label>
                                        <DatePicker
                                            label="Date"
                                            name="date"
                                            dateFormat="dd/MM/yyyy"
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                            isClearable
                                            placeholderText="Date cleared!"
                                            errors={errors.date}
                                        />

                                        <span className="text-red-600">
                                            {errors.date}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">No days</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="No days"
                                            name="no_days"
                                            errors={errors.no_days}
                                            value={data.no_days}
                                            onChange={(e) =>
                                                setData(
                                                    "no_days",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.no_days}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">No persons</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="No persons"
                                            name="no_persons"
                                            errors={errors.no_persons}
                                            value={data.no_persons}
                                            onChange={(e) =>
                                                setData(
                                                    "no_persons",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.no_persons}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
