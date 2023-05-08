import './App.css';
import {useState, useEffect} from 'react';
import EmployeeList from './components/EmployeeList';
import Form from './components/Form';



function App() {

  const [employees, setEmployees] = useState([])
  const [editedEmployee, setEditedEmployee] = useState(null)


  useEffect (() =>{
    fetch('http://localhost:8000/employees', {
       'methods': 'GET',
       headers: {
        'Content-Type': 'application/json'
      } 
    })
    .then(resp => resp.json())
    .then(resp => setEmployees(resp))
    .catch(error => console.log(error))
    },[])

    const editEmployee = (employee) => {
      setEditedEmployee(employee)
  }


  const updatedData = (employee) => {
    const new_employee = employees.map(my_employee => {
      if(my_employee.id === employee.id) {
        return employee

      } else {
        return my_employee
      }
    })
      setEmployees(new_employee)
  }

  const openForm = () => {    
    setEditedEmployee({'firstname':'', 'lastname':'', 'email':'', 'date':''})
  }


const insertedEmployee = (employee) => {
  const new_employees = [...employees, employee]
  setEmployees(new_employees)

}

  return (
    <div className="App">
      <div className="row">
      <div className= "col">
      <h1>Registration App</h1>
      

      </div>
      <div classname ="col" >
        <button
        className = "btn btn-success"
        onClick ={openForm}
        >Click to fill out form at the bottom of page</button>

</div>
</div>
        
        <br/>
        <br/>
        
        <EmployeeList employees = {employees} editEmployee={editEmployee}/>{editedEmployee ? 
        <Form employee = {editedEmployee} updatedData = {updatedData} insertedEmployee  = {insertedEmployee}/>: null}
        </div>
  
  );
}

export default App;
