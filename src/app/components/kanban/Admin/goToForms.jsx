"use client";

import Link from "next/link";
import { FaQuestionCircle, FaCog, FaSun, FaMoon, FaAddressBook, FaFolder } from "react-icons/fa";

export default function GoToForms(){
    return(
    <div>
        <Link href="/formulario" className="flex items-center space-x-3 dark:text-white hover:text-blue-500">
                    <FaFolder />
                    <span className=" group-hover:inline">Formulário pra MVP</span>
                  </Link>
    </div>
    )
}