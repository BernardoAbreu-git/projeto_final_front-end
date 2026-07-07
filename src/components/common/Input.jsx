export default function Input({

    label,

    ...props

}){

    return(

        <div>

            <label className="block mb-2 font-medium">

                {label}

            </label>

            <input

                {...props}

                className="

                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3

                    outline-none

                    focus:border-blue-600

                "

            />

        </div>

    )

}