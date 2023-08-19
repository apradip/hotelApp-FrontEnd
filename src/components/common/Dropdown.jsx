import { useState } from "react";

export default function Dropdown({childern, trigger}) {
    const [show, setShow] = useState(false);

    return(
        <div className="w-fit relative" onClick={() => {setShow((curr) => !curr)}}>
            <div>{trigger}</div>
            {show && <ul className={`min-w-max absolute roght-0 mt-2
                                    bg-white divite-y divide-gray-100
                                    rounded-lg shadow overflow-hidden`}>{childern}</ul>}
        </div>
    );
}

export function DropdownItem({childern}) {
    return(
        <li className={`flex gap-3 items-center px-4 py-2
                        text-gray-800 hover:bg-gray-50
                        cutsor-pointer`}>
            {childern}
        </li>
    );

}