import React from 'react'
import { useState, useEffect } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

    return (

        <div>
            <h2 className="text-center"> List of employees</h2>
            <button type="button" className="btn btn-success" onClick={addNewEmployee}>Add Employee</button>
            <table className="table table-bordered table-dark employees">
                <thead>
                    <tr>
                        <th>Employee id</th>
                        <th>Employee first name</th>
                        <th>Employee last name</th>
                        <th>Employee email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map(employee => <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                style={{ marginLeft: '10px' }}
                            >Delete</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList