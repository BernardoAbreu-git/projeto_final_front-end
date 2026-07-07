import { FaSearch } from "react-icons/fa";

export default function SearchBar({

    placeholder,

    value,

    onChange

}){

    return(

        <div className="relative w-80">

            <FaSearch
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                "
            />

            <input

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="
                    w-full
                    border
                    rounded-xl
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    focus:border-blue-600
                "

            />

        </div>

    )

}