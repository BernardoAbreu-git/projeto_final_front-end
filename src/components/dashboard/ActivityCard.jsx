export default function ActivityCard({ title, description, time }) {

    return (

        <div className="flex justify-between items-center py-4 border-b last:border-b-0">

            <div>

                <h3 className="font-semibold text-gray-700">

                    {title}

                </h3>

                <p className="text-gray-500 text-sm">

                    {description}

                </p>

            </div>

            <span className="text-sm text-gray-400">

                {time}

            </span>

        </div>

    );

}