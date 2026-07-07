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

                    <p className="text-gray-500 text-sm font-medium">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-gray-800">

                        {value}

                    </h2>

                </div>

                <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl`}>

                    {icon}

                </div>

            </div>

        </div>

    );

}