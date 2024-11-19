"use client"

import { useState, useEffect } from 'react';
import React from 'react';
import Navbar from './components/Navbar';

export default function Home(props) {
  const [empleados, setEmpleados] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [employeeAll, setEmployeeAll] = useState(true);

  const handleSearch = async (searchTerm, searchType) => {
    try {
      setErrorMessage('');
      let url = '/api/employee';

      if (searchTerm.trim()) {
        url = `/api/employee/${searchTerm}?field=${searchType}&term=${searchTerm}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!data || data.message == "No se encontraron registros") {
        setErrorMessage('No se encontraron empleados con los criterios de búsqueda');
        setEmpleados([]);
      } else {
        setEmpleados(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error al buscar empleados:', error);
      setErrorMessage('Ocurrió un error al buscar empleados');
      setEmpleados([]);
    }
  };

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
    <div >
      <Navbar onSearch={handleSearch} />
      <div className='container mx-auto p-4'>
        {errorMessage !== '' ? (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {errorMessage}
          </div>
        ) : (
          <div className="grid grid-cols-[150px_200px_140px_100px] gap-0 mt-2 text-sm">
            <div className='font-bold font-mono '>Cédula</div>
            <div className='font-bold font-mono '>Nombre</div>
            <div className='font-bold font-mono '>Cod Empleado</div>
            <div className='font-bold font-mono '>Bono Navidad</div>

            {empleados.map((empleado, index) => (
              <React.Fragment key={index}>
                <div className='p-0 hover:bg-gray-100'>{empleado.ced}</div>
                <div className='p-0 hover:bg-gray-100'>{empleado.name} {empleado.last_name}</div>
                <div className='p-0 hover:bg-gray-100'>{empleado.cod_emp}</div>
                <div className={`${empleado.stat_bonus ? 'bg-green-500 text-white p-2 font-bold rounded-md inline-block w-24' : 'bg-red-200 inline-block w-24'} hover:bg-gray-100`}>
                  {empleado.stat_bonus ? 'Entregado' : 'Sin entregar'}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      {employeeAll && (
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
      )}
    </div>
  );
}
