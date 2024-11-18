"use client"
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


export default function Navbar() {
    const handleSearch = () => {
        console.log("Buscar");
    }
    return (


        <nav className="flex justify-between items-center p-2 border-b border-gray-300">
            <div className="flex items-center gap-1 p-1">
                <img className="w-25 h-20" src="/logo.png" alt="Logo" />
                <h1 className="text-xl font-bold">Entrega de bonos</h1>

            </div>
            <div className="flex items-center gap-4">

                <select className="border border-gray-300 rounded-md p-2">
                    <option value="name">Nombre</option>
                    <option value="ced">Cedula</option>
                    <option value="cod">Cod Emplado</option>
                </select>
                <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                    <input className="border border-gray-300 rounded-md p-2 w-full" type="text" placeholder="Buscar..." size="40" />
                    <IoSearch className="w-5 h-5 hover:text-green-500 ml-2 cursor-pointer" onClick={handleSearch} />
                </div>
            </div>
            <div className="flex items-center gap-2 flex-col cursor-pointer">
                <FaRegUser className="w-5 h-5" />
                <span>Welcome, User</span>
            </div>
        </nav>

    )
}