import React, {useState, useEffect} from 'react';
import APIService from '../components/APIService';    

function Form(props) {
    const[firstname, setFirstName] = useState('')
    const[lastname, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[date, setDate] = useState('')

    useEffect(() => {
        setFirstName(props.employee.firstname)
        setLastName(props.employee.lastname)
        setEmail(props.employee.email)
        setDate(props.employee.date)

},[props.employee]) 

    const updateEmployee = () => {
        APIService.UpdateEmployee(props.employee.id, {firstname, lastname, date, email})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))

    }

    const insertEmployee = () => {
        //alert ("Thank you! Your info has been stored in our database");
        APIService.InsertEmployee({firstname, lastname, email})
        .then(resp => props.insertedData(resp))
        .catch(error => console.log(error))
    }
    
    
    return (
        <div>
            {props.employee ? (
                <div className = "mb-3">

                <label htmlFor ="firstname" 
                classname = "form-label">FirstName</label>
                <input type = "text" className = "form-control"
                value = {firstname}
                placeholder="Enter firstname"
                onChange = {(e) => setFirstName(e.target.value)}
                />

                <label htmlFor ="lastname" 
                classname = "form-label">LastName</label>
                <input type = "text" className = "form-control"
                 value = {lastname}
                 onChange = {(e) => setLastName(e.target.value)}
                 placeholder="Enter lastname"

                />
                
                <label htmlFor ="email" 
                classname = "form-label">Email</label>
                <input type = "text" className = "form-control"
                 value = {email}
                 onChange = {(e) => setEmail(e.target.value)}
                 placeholder="Enter email"

                />

                {
                    props.employee.id ? <button
                    onClick={updateEmployee}
                    className = "btn btn-success mt-3"
                    >Update</button>
                    :

                    <button
                    onClick={insertEmployee}
                    className = "btn btn-success mt-3"
                    >Insert Employee</button>
            }
                </div>
            ):null}
            </div>
            )
        
}


export default Form;