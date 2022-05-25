import React, { useEffect, useRef, useState } from 'react'
import axios from '../services/axios'
import * as  IconName  from "react-icons/fa";
import {useHistory} from 'react-router'


const ListaCliente=()=>{
  const history = useHistory();
  const inicialState = {id: 3, nombreCliente: '', apellidoCliente: '', direccionCliente: '', fechaNacimiento: '', telefono:'',correoElectronico:''}
  const [clienteForm, setClienteForm]= useState(inicialState)
  const [clientes, setClientes]= useState([])

  async function listadoclientes ()  {
     const a = await axios.get('cliente')
     const b = a.data.Clientes
     console.log(b)
     setClientes(b)
    }
  
    
    const handleInputChange =(e)=>{
      // console.log(e.target.name)
      // console.log(e.target.value)

      setClienteForm({...clienteForm, [ e.target.name]: e.target.value})
    }
    useEffect(()=>{
      listadoclientes();
      },[])
  
      const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(clienteForm.nombreCliente);
        axios.post('cliente', {
          nombreCliente: clienteForm.nombreCliente,
          apellidoCliente: clienteForm.apellidoCliente,
          direccionCliente:clienteForm.direccionCliente,
          fechaNacimiento:clienteForm.fechaNacimiento,
          telefono:clienteForm.telefono,
          correoElectronico:clienteForm.correoElectronico
        })
        .then(function (response) {
          console.log(response);
          setClienteForm(inicialState)
          history.push('/cliente')
        })
        .catch(function (error) {
          console.log(error);
        });
      }

  return (
    <div className='asd'>
      <div className="container">
        <div className="row">
          <div  className="col-md-4 pt-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input type="text" name="nombreCliente" value={clienteForm.nombreCliente} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control" autoFocus required />
              </div>
              <div className="mb-2">
                <label className="form-label">Apellido</label>
                <input type="text" name="apellidoCliente" value={clienteForm.apellidoCliente} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control"  required />
              </div>
              <div className="mb-2">
                <label className="form-label">Dirección</label>
                <input type="text" name="direccionCliente" value={clienteForm.direccionCliente}  onChange={handleInputChange} className="form-control" min="1900" max="2020"  required />
              </div>

              <div className="mb-2">
                <label className="form-label">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" value={clienteForm.fechaNacimiento} className="form-control"  onChange={handleInputChange} maxLength="100"  required />
              </div>
              <div className="mb-2">
                <label className="form-label">Telefono</label>
                <input type="number" name="telefono" className="form-control"  value={clienteForm.telefono} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Correo Electronico</label>
                <input type="email" name="correoElectronico" className="form-control" value={clienteForm.correoElectronico}  maxLength="100" onChange={handleInputChange} required />
              </div>
              <div className="d-grid gap-2 pb-5">
                <button type="submit" className="btn btn-block btn-primary">
                  Update
                </button>
              </div>




            </form>
          </div>
          <div  className="col-md-8 pt-4">
            <table className='table table-bordered border-dark'>
              <thead  className="thead-dark">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Fecha nacimiento</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Correo Electro</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente=>{
                  return(
                    
                    <tr key={cliente.id}>

                      <td>{cliente.id}</td>
                      <td>{cliente.nombreCliente}</td>
                      <td>{cliente.apellidoCliente}</td>
                      <td>{cliente.direccionCliente}</td>
                      <td>{cliente.fechaNacimiento}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.correoElectronico}</td>
                      <td>
                        <button className='btn btn-info'><IconName.FaPencilAlt/></button>
                      </td>
                    </tr>
                  )
                })

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ListaCliente;