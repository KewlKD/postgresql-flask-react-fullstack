import React from 'react'

function EmployeeList(props) {

    const editEmployee = (employee) => {
                props.editEmployee(employee)

    }

    return (
        <div>
            {props.employees && props.employees.map(employee => {
    return (
      <div key = {employee.id}>
        <p>{employee.id}</p>
        <p>{employee.firstname}</p>
        <p>{employee.lastname}</p>
        <p>{employee.email}</p>
        <p>{employee.date}</p>

        <div classname = "row">
            <div classname ="col-md-1">
                <button className = "btn btn-primary"
                onClick = {() => editEmployee(employee)}>Choose to Edit/Delete</button>
            </div>


            </div>

            <hr/>

            </div>
          )
        })}
        
        </div>
        )
    }
        export default EmployeeList;