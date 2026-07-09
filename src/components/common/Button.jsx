export default function Button({

    children,

    onClick,

    icon,

    color="blue",

    type="button"

}){

    const colors={

        blue:"bg-blue-700 hover:bg-blue-800",

        red:"bg-red-600 hover:bg-red-700",

        green:"bg-green-600 hover:bg-green-700",

        gray:"bg-gray-600 hover:bg-gray-700"

    }

    return(

        <button

            type={type}

            onClick={onClick}

            className={`
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                text-white
                font-semibold
                transition
                ${colors[color]}
            `}

        >

            {icon}

            {children}

        </button>

    )

}