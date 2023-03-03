import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Swal from 'sweetalert2';

const AddUser = () => {
  const userStorage = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const [users, setUsers] = useState(userStorage);
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const { setValue, handleSubmit, register, formState: { errors } } = useForm();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      let userID = users.filter((user) => user.eCodUsuario === params.id);
      if (userID.length > 0) {
        userID = userID[0];

        setUserID(userID.eCodUsuario);
        setValue('Nombre', userID.tNombre);
        setValue('ApellidoPaterno', userID.tApellidoPaterno);
        setValue('ApellidoMaterno', userID.tApellidoMaterno);
        setValue('Email', userID.tCorreo);
        setValue('Telefono', userID.eTelefono);
      }
    }
  }, [])


  const handleAddUser = (datos) => {
    if (userID !== "") {
      let tempUsers = users;
      tempUsers.map((user) => {
        if (user.eCodUsuario === userID) {
          user.tNombre = datos.Nombre;
          user.tApellidoPaterno = datos.ApellidoPaterno;
          user.tApellidoMaterno = datos.ApellidoMaterno;
          user.tCorreo = datos.Email;
          user.eTelefono = datos.Telefono;
          return;
        }
      });

      setUsers(tempUsers);
      localStorage.setItem('users', JSON.stringify(users))

      Swal.fire({
        title: 'Usuario editado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(result => {
        return navigate('/');
      });
    } else {

      let tempUsers = users;
      tempUsers.push({
        eCodUsuario: uuidv4(),
        tNombre: datos.Nombre,
        tApellidoPaterno: datos.ApellidoPaterno,
        tApellidoMaterno: datos.ApellidoMaterno,
        tCorreo: datos.Email,
        eTelefono: datos.Telefono
      });

      setUsers(tempUsers);
      localStorage.setItem('users', JSON.stringify(users))

      Swal.fire({
        title: 'Usuario agregado correctamente',
        icon: 'success',
        timer: 1500
      }).then(result => {
        return navigate('/');
      });
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mt-3 mb-10'>
        {userID !== "" ? 'Editar usuario' : 'Nuevo usuario'}
      </h2>
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-12 md:col-span-8 md:col-start-3 mb-4 md:text-left">
          <NavLink to='/' className='btn btn-dark block text-center md:inline'>Regresar</NavLink>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-3 px-2 md:px-0 py-6 bg-gray-100 rounded-md'>
          <form onSubmit={handleSubmit(handleAddUser)} className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 md:col-span-4 md:col-start-5'>
              <input
                autoComplete='off'
                type="text"
                className={errors.Nombre ? 'input-error' : 'input'}
                placeholder='Nombre'
                {...register('Nombre', { required: true })}
              />
              {errors.Nombre && <ErrorMessage icon={true} msg='Completa este dato' />}
            </div>
            <div className='col-span-12 md:col-span-4 md:col-start-5'>
              <input
                autoComplete='off'
                type="text"
                className={errors.ApellidoPaterno ? 'input-error' : 'input'}
                placeholder='Apellido paterno'
                {...register('ApellidoPaterno', { required: true })}
              />
              {errors.ApellidoPaterno && <ErrorMessage icon={true} msg='Completa este dato' />}
            </div>
            <div className='col-span-12 md:col-span-4 md:col-start-5'>
              <input
                autoComplete='off'
                type="text"
                className={errors.ApellidoMaterno ? 'input-error' : 'input'}
                placeholder='Apellido materno'
                {...register('ApellidoMaterno', { required: true })}
              />
              {errors.ApellidoMaterno && <ErrorMessage icon={true} msg='Completa este dato' />}
            </div>
            <div className='col-span-12 md:col-span-4 md:col-start-5'>
              <input
                autoComplete='off'
                type="text"
                className={errors.Email ? 'input-error' : 'input'}
                placeholder='Email'
                {...register('Email', { required: true })}
              />
              {errors.Email && <ErrorMessage icon={true} msg='Completa este dato' />}
            </div>
            <div className='col-span-12 md:col-span-4 md:col-start-5'>
              <input
                autoComplete='off'
                type="text"
                className='input'
                placeholder='Teléfono'
                {...register('Telefono')}
              />
            </div>
            <button type='submit' className='btn btn-dark col-span-12 md:col-span-4 md:col-start-5'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser