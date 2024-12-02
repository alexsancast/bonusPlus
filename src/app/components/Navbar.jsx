"use client"
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";


export default function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name');

    const handleSearch = () => {
        onSearch(searchTerm, searchType);
    }
    return (


        <nav className="flex justify-between items-center p-2 border-b border-gray-300">
            <div className="flex items-center gap-1 p-1 pl-4">
                <a href="/">
                    <img className="w-17 h-14" src="/logo.png" alt="Logo" />
                </a>
            </div>
            <div className="flex items-center gap-4">

                <select onChange={(e) => setSearchType(e.target.value)} className="border border-gray-300 rounded-md p-2">
                    <option value="name">Nombre</option>
                    <option value="ced">Cedula</option>
                    <option value="cod_emp">Cod Empleado</option>
                </select>
                <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                    <input value={searchTerm} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" type="text" placeholder="Buscar..." size="40" />
                    <IoSearch onClick={handleSearch} className="w-5 h-5 hover:text-blue-500 ml-2 cursor-pointer" />
                </div>
            </div>
            <div className="flex items-center gap-2 flex-col cursor-pointer mr-4 pr-4">
                <FaRegUser className="w-5 h-5" />
                <span>Welcome, User</span>
            </div>
        </nav>

    )
}