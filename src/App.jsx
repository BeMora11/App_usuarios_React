import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import AddUser from './pages/AddUser';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { index: true, element: <UsersList /> },
        { path: 'add-user', element: <AddUser /> },
        { path: 'add-user/:id', element: <AddUser /> },
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App