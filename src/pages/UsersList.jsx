import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';

const UsersList = () => {
  const userStorage = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const [users, setUsers] = useState(userStorage);

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: '¿Desea eliminar este usuario?',
      text: 'La inforación se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        let tempUsers = users.filter((user) => user.eCodUsuario !== id);
        setUsers(tempUsers);
        localStorage.setItem('users', JSON.stringify(tempUsers))
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Usuario eliminado correctamente',
          icon: 'success',
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mt-3 mb-10'>Lista de usuarios</h2>
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-12 md:col-span-8 md:col-start-3 mb-4 md:text-right">
          <NavLink to='/add-user' className='btn btn-dark block md:inline text-center'>Crear usuario</NavLink>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-3 overflow-x-auto'>
            <table className='w-full rounded-md whitespace-nowrap overflow-hidden'>
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className='py-2 px-6'>#</th>
                <th className='py-2 px-6'>Nombre</th>
                <th className='py-2 px-6'>Apellido paterno</th>
                <th className='py-2 px-6'>Apellido materno</th>
                <th className='py-2 px-6'>Email</th>
                <th className='py-2 px-6'>Teléfono</th>
                <th className='py-2 px-6'>Acciones</th>
              </tr>
            </thead>
            <tbody className='bg-gray-50'>
              {users.length > 0 ?
                users.map((user) => (
                  <tr key={user.eCodUsuario} className='hover:bg-gray-100 transition duration-200'>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.eCodUsuario}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.tNombre}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.tApellidoPaterno}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.tApellidoMaterno}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.tCorreo}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>{user.eTelefono}</td>
                    <td align='center' className='px-6 md:px-0 py-2'>
                      <NavLink
                        to={`/add-user/${user.eCodUsuario}`}
                        className='btn-sm btn-primary mr-1'
                      >Editar</NavLink>
                      <button
                        className='btn-sm btn-error'
                        onClick={() => handleDeleteUser(user.eCodUsuario)}
                      >Eliminar</button>
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td className='py-2 font-semibold' align='center' colSpan={7}>No hay datos disponibles</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersList