"use client"

import { useState } from 'react';
import React from 'react';
import Navbar from './components/Navbar';

export default function Home(props) {
  const [empleados, setEmpleados] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className='container mx-auto p-4'>
        {errorMessage !== '' ? (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {errorMessage}
          </div>
        ) : (
          <div className='grid grid-cols-4 gap-1 mt-2 text-sm'>
            <div className='font-bold w-auto font-mono '>Cédula</div>
            <div className='font-bold w-auto font-mono '>Nombre</div>
            <div className='font-bold w-auto font-mono'>Código Empleado</div>
            <div className='font-bold w-auto font-mono'>Bono</div>
            {empleados.map((empleado, index) => (
              <React.Fragment key={index}>
                <div>{empleado.ced}</div>
                <div>{empleado.name} {empleado.last_name}</div>
                <div>{empleado.cod_emp}</div>
                <div className={empleado.stat_bonus ? 'bg-green-500 text-white p-2 font-bold rounded-md inline-block w-24' : 'bg-red-200 inline-block w-24'}>
                  {empleado.stat_bonus ? 'Entregado' : 'Sin entregar'}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
