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
          <div className='grid grid-cols-6 gap-4 mt-4'>
            <div className='font-bold'>Cédula</div>
            <div className='font-bold'>Nombre</div>
            <div className='font-bold'>Apellido</div>
            <div className='font-bold'>Estado</div>
            <div className='font-bold'>Código Empleado</div>
            <div className='font-bold'>Bono</div>
            {empleados.map((empleado, index) => (
              <React.Fragment key={index}>
                <div>{empleado.ced}</div>
                <div>{empleado.name}</div>
                <div>{empleado.last_name}</div>
                <div>{empleado.status ? 'Activo' : 'Sin estado'}</div>
                <div>{empleado.cod_emp}</div>
                <div>{empleado.stat_bonus ? 'Entregado' : 'Sin estado'}</div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
