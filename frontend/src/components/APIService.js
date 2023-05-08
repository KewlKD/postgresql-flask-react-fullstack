/* eslint-disable no-template-curly-in-string */


export default class APIService {
    static async UpdateEmployee(firstname,lastname,email) {

        const resp = await fetch('http://127.0.0.1:8000/update/${id}/', {
        'method': 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstname, lastname, email)
      })
      return await resp.json()

    }
    
    static async InsertEmployee(firstname,lastname,email) {
      const resp = await fetch('http://127.0.0.1:8000/add', {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstname, lastname, email)
      })
      return await resp.json()
      }

    }