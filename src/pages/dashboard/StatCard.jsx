export default function StatCard({
    title,
    value,
    icon,
    color = "bg-blue-600"
}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className={`${color} text-white p-4 rounded-xl text-2xl`}>

                    {icon}

                </div>

            </div>

        </div>

    );

}