import React from "react";

export default function StatCard({

    title,
    value,
    icon,
    color = "bg-blue-600"

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-lg">

                        {title}

                    </p>

                    <h2 className="text-5xl font-bold mt-3 text-gray-800">

                        {value}

                    </h2>

                </div>

                <div className={`${color} w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl`}>

                    {icon}

                </div>

            </div>

        </div>

    );

}