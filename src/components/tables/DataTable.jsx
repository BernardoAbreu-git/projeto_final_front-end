export default function DataTable({

    columns,

    data,

    actions

}) {

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="border-b bg-gray-50">

                        {

                            columns.map(col=>(

                                <th
                                    key={col}
                                    className="text-left p-4 font-semibold"
                                >

                                    {col}

                                </th>

                            ))

                        }

                        {

                            actions &&

                            <th className="p-4">

                                Ações

                            </th>

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((row,index)=>(

                            <tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                            >

                                {

                                    Object.values(row).map((value,i)=>(

                                        <td
                                            key={i}
                                            className="p-4"
                                        >

                                            {value}

                                        </td>

                                    ))

                                }

                                {

                                    actions &&

                                    <td className="p-4">

                                        {actions(row)}

                                    </td>

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}