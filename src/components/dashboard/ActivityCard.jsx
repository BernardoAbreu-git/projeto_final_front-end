import Card from "../common/Card";

export default function ActivityCard({ title, items = [] }) {

    return (

        <Card>

            <h2 className="text-xl font-bold text-gray-800 mb-5">

                {title}

            </h2>

            <div className="space-y-4">

                {items.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-3 border-b pb-3 last:border-b-0"
                    >

                        <div className="w-3 h-3 rounded-full bg-blue-600 mt-2"></div>

                        <p className="text-gray-600">

                            {item}

                        </p>

                    </div>

                ))}

            </div>

        </Card>

    );

}