import React from "react";
import { Link } from "react-router-dom";

const Paging = ({ itemPerPage, totalItem, selectedPage, onPaging }) => {
    const pages = [];

    for (let idx = 1; idx <= Math.ceil(totalItem / itemPerPage); idx++) {
        pages.push(idx);
    };

    return (
        <nav>
            <ul className='pagination'>
                {pages.map(item => (
                    <li key={item} className={selectedPage === item ? "page-item active" : "page-item"}>
                        <Link className="page-link" 
                            href="window.location"
                            onClick={() => onPaging(item)}>
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Paging;