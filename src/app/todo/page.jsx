import React from 'react'
import CreateTodoForm from './Components/CreateTodoForm';
import Logout from './Components/Logout';

function page() {
  return (
    <div>
      <CreateTodoForm/>
      <Logout/>
    </div>
  )
}

export default page
