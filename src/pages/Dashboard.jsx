import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard