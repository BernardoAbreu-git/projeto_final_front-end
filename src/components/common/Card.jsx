export default function Card({ children, className = "" }) {

    return (

        <div
            className={`
                bg-white
                rounded-2xl
                shadow-md
                border
                border-gray-200
                p-6
                ${className}
            `}
        >

            {children}

        </div>

    );

}