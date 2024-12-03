"use client"

import { useState, useEffect } from 'react';
import React from 'react';
import Navbar from './components/Navbar';
import Employee from './components/Employee';
import Modal from './components/Modal';
import { Loading } from './components/Loading';


export default function Home(props) {
  const [empleados, setEmpleados] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeAll, setEmployeeAll] = useState([]);


  const handleLoad = async () => {
    let url = '/api/employee';
    const response = await fetch(url);
    if (!response.ok) {
      return { message: "No se encontraron registros" };
    }
    const data = await response.json();
    setEmployeeAll(data);
  }


  const handleSearch = async (searchTerm, searchType) => {
    try {
      setErrorMessage('');
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error('Error al buscar empleados:', error);
      setErrorMessage('Ocurrió un error al buscar empleados');
      setEmpleados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (empleado) => {
    setSelectedEmployee(empleado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  return (
    <div >
      <Navbar onSearch={handleSearch} />



      <div className='container mx-auto p-4 flex items-center justify-between'>
        {errorMessage !== '' ? (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {errorMessage}
          </div>
        ) : (
          <div className="grid grid-cols-[150px_200px_140px_160px_300px] gap-0 mt-2 text-sm">
            <div className='font-bold font-mono '>Cédula</div>
            <div className='font-bold font-mono '>Nombre</div>
            <div className='font-bold font-mono '>Cod Empleado</div>
            <div className='font-bold font-mono '>Bono Navidad</div>
            <div className='font-bold font-mono '>Acciones</div>
            <div className='col-span-5 border-b border-gray-300 my-1'></div>
            {loading ? (<Loading />) : (
              empleados.map((empleado, index) => (
                <React.Fragment key={index}>
                  <div className='p-0'>{empleado.ced}</div>
                  <div className='p-0 '>{empleado.name} {empleado.last_name}</div>
                  <div className='p-0 '>{empleado.cod_emp}</div>
                  <div className={`${empleado.stat_bonus ? 'bg-green-500 text-white p-2 font-bold rounded-md inline-block w-24' : 'bg-red-200 inline-block w-24'} `}>
                    {empleado.stat_bonus ? 'Entregado' : 'Sin entregar'}
                  </div>
                  <button onClick={() => handleEditClick(empleado)} className='hover:bg-blue-100 bg-blue-500 text-white p-2 font-bold rounded-md inline-block w-24'>
                    Ver
                  </button>

                </React.Fragment>
              ))
            )}
          </div>
        )}

        <Employee handleLoad={handleLoad} employeeAll={employeeAll} />
        {showModal && (
          <Modal handleLoad={handleLoad} empleado={selectedEmployee} onClose={handleCloseModal} handleSearch={handleSearch} />
        )}
      </div>



    </div>
  );
}
