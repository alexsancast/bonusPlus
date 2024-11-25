import React from 'react';
const punycode = require('punycode');
import { useState } from 'react';
import { CircularIndeterminate } from './Loading';

export default function Modal({ empleado, onClose, handleSearch, handleLoad }) {
    const [loading, setLoading] = useState(false);

    const handleEntregarBono = async () => {
        const url = `/api/employee/${empleado.id}`;
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: empleado.id }),
            });

            if (!response.ok) {
                throw new Error('Error al entregar el bono');
            }
            // const data = await response.json();
            handleSearch(empleado.name, 'name');
            handleLoad();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    if (!empleado) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detalles del Empleado
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Cédula: {empleado.ced}
                        </p>
                        <p className="text-sm text-gray-500">
                            Nombre: {empleado.name} {empleado.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                            Código Empleado: {empleado.cod_emp}
                        </p>
                        <p className="text-sm text-gray-500">
                            Bono Navidad: {empleado.stat_bonus ? 'Entregado' : 'Sin entregar'}
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">

                        <button onClick={async () => {
                            await handleEntregarBono();
                            onClose();
                        }} className='mb-2 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                            {loading ? <CircularIndeterminate /> : 'Entregar Bono'}
                        </button>
                        <button
                            className="mb-2 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={onClose}
                        >
                            Cerrar

                        </button>
                        <input type="text" placeholder="Firma" className='w-full p-2 border border-gray-300 rounded-md' />
                    </div>
                </div>
            </div>
        </div>
    );
}