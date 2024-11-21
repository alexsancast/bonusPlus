import React, { useState, useEffect } from 'react'



export default function Employee() {
    const [employeeAll, setEmployeeAll] = useState([]);

    const handleLoad = async () => {
        let url = '/api/employee';
        const response = await fetch(url);
        const data = await response.json();
        setEmployeeAll(data);
    }

    useEffect(() => {
        handleLoad();
    }, []);
    return (
        employeeAll && (
            <div className='bg-white shadow-lg shadow-gray-600/100 rounded-lg p-4 mt-4 mb-4 max-w-xl mx-auto text-center flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold'>Bonos entregados</h1>
                <p className='text-xs font-bold'>{employeeAll.length} empleados han recibido su bono de navidad</p>
                <div className="grid grid-cols-[120px_160px] gap-0 mt-2 text-sm">
                    {employeeAll.map((empleado, index) => (
                        <React.Fragment key={index}>
                            <div className='p-0 hover:bg-gray-100'>{empleado.cod_emp}</div>
                            <div className='p-0 hover:bg-gray-100'>{empleado.name} {empleado.last_name}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    );
}