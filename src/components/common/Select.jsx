export default function Select({

    label,

    children,

    ...props

}){

    return(

        <div>

            <label className="block mb-2 font-medium">

                {label}

            </label>

            <select

                {...props}

                className="

                    w-full

                    border

                    rounded-xl

                    p-3

                "

            >

                {children}

            </select>

        </div>

    )

}