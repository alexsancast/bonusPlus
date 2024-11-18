"use client"

import { useEffect, useState } from 'react';
import React from 'react';
export default function Home() {
  const [empleados, setEmpleados] = useState([]);

  async function obtenerEmpleados() {
    try {
      const response = await fetch('/api/employee');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  }

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1>Lista de Empleados</h1>
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
    </div>
  );
}