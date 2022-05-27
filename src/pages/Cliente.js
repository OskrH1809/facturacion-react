import React, { useEffect, useRef, useState } from 'react'
import axios from '../services/axios'
import swal from 'sweetalert';
import * as  IconName from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router'


const ListaCliente = () => {
  const history = useHistory();
  const params = useParams();
  const inicialState = { id: '', nombreCliente: '', apellidoCliente: '', direccionCliente: '', fechaNacimiento: '', telefono: '', correoElectronico: '' }
  const [clienteForm, setClienteForm] = useState(inicialState)
  const [clientes, setClientes] = useState([])

  async function listadoclientes() {
    const a = await axios.get('cliente')
    const b = a.data.Clientes
    console.log(b)
    setClientes(b)
  }


  const handleInputChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)

    setClienteForm({ ...clienteForm, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    listadoclientes();
  }, [])

  const handleSubmit = (e) => {
   
    console.log(clienteForm.nombreCliente);
    
   
    {params.id ? (
      axios.put(`cliente/${params.id}`, {
        nombreCliente: clienteForm.nombreCliente,
        apellidoCliente: clienteForm.apellidoCliente,
        direccionCliente: clienteForm.direccionCliente,
        fechaNacimiento: clienteForm.fechaNacimiento,
        telefono: clienteForm.telefono,
        correoElectronico: clienteForm.correoElectronico
      })
        .then(function (response) {
          console.log(response);
          setClienteForm(inicialState)
          listadoclientes();
        })
        .catch(function (error) {
          console.log(error);
        })
    ) : (
        axios.post('cliente', {
        nombreCliente: clienteForm.nombreCliente,
        apellidoCliente: clienteForm.apellidoCliente,
        direccionCliente: clienteForm.direccionCliente,
        fechaNacimiento: clienteForm.fechaNacimiento,
        telefono: clienteForm.telefono,
        correoElectronico: clienteForm.correoElectronico
      })
        .then(function (response) {
          console.log(response);
          setClienteForm(inicialState)
          listadoclientes();
        })
        .catch(function (error) {
          console.log(error);
        })
    )} 
    
    
    
    
    
  }
  const handleDelete = (clienteId) => {
    console.log(clienteId);
    axios.delete(`cliente/${clienteId}`)
      .then(function (response) {
        console.log(response);
        setClienteForm(inicialState);
        listadoclientes();
        history.push('/cliente')

        
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const confirmarActualizacion=()=>{
    swal({
      title: "Desea actualizar este registro?",
      text: "Modificara los datos del registro seleccionado",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willUpdate) => {
      if (willUpdate) {
        handleSubmit()
        setClienteForm(inicialState);
        history.push('/cliente')
        swal("El registro ha sido actualizado", {
          icon: "success",
        });
      } else {
        swal("Actualizacion cancelada");
      }
    });
  }
  const confirmarRegistrar=()=>{
    swal({
      title: "Desea guardar el registro?",
      text: "Guardara el registro en el sistema",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willCreate) => {
      if (willCreate) {
        handleSubmit()
        setClienteForm(inicialState);
        swal("El registro ha sido guardado", {
          icon: "success",
        });
      } else {
        swal("registro cancelada");
        setClienteForm(inicialState);
      }
    });
  }
  const confirmacionBorrado=(id)=>{
    swal({
      title: "Desea eliminar este registro?",
      text: "Este registro se borrara de forma permanente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDelete(id)
        swal("El registro ha sido eliminado", {
          icon: "success",
        });
      } else {
        swal("Eliminacion cancelada");
      }
    });
  }
  return (
    <div className="container">
        <h1 className='text-center pt-4'>Clientes</h1>

        <div className="row">
          <div className="col-md-4 pt-3">
            <form >
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input type="text" name="nombreCliente" value={clienteForm.nombreCliente} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control" autoFocus required />
              </div>
              <div className="mb-2">
                <label className="form-label">Apellido</label>
                <input type="text" name="apellidoCliente" value={clienteForm.apellidoCliente} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control" required />
              </div>
              <div className="mb-2">
                <label className="form-label">Dirección</label>
                <input type="text" name="direccionCliente" value={clienteForm.direccionCliente} onChange={handleInputChange} className="form-control" min="1900" max="2020" required />
              </div>

              <div className="mb-2">
                <label className="form-label">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" value={clienteForm.fechaNacimiento} className="form-control" onChange={handleInputChange} maxLength="100" required />
              </div>
              <div className="mb-2">
                <label className="form-label">Telefono</label>
                <input type="number" name="telefono" className="form-control" value={clienteForm.telefono} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Correo Electronico</label>
                <input type="email" name="correoElectronico" className="form-control" value={clienteForm.correoElectronico} maxLength="100" onChange={handleInputChange} required />
              </div>
              <div className="d-grid gap-2">
                {params.id ? (
                  <button type="button" onClick={confirmarActualizacion}  className="btn btn-block btn-info">
                    Actualizar
                  </button>
                   
                ) : (
                  <button type="button" onClick={confirmarRegistrar} className="btn btn-block btn-success">
                    Registrar
                  </button>
                )}
              </div>

              <div className="d-grid gap-2 pt-3">
                {params.id && (
                  <button onClick={() =>{
                    setClienteForm(inicialState)
                    history.push('/cliente')
                  }} type="submit" className="btn btn-block btn-danger">
                  Cancelar
                </button>
                   
                )}
              </div>
              
              




            </form>
          </div>
          <div className="col-md-8 pt-4">
            <table className='table table-bordered border-dark'>
              <thead className="table-dark">
                <tr className='botones'>
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
                {clientes.map(cliente => {
                  return (

                    <tr key={cliente.id}>

                      <td>{cliente.id}</td>
                      <td>{cliente.nombreCliente}</td>
                      <td>{cliente.apellidoCliente}</td>
                      <td>{cliente.direccionCliente}</td>
                      <td>{cliente.fechaNacimiento}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.correoElectronico}</td>
                      <td>

                        <div className="col-auto botones">
                          <button onClick={() => {
                            setClienteForm(cliente)
                            history.push(`/cliente-actualizar/${cliente.id}`)
                          } }  className='btn btn-info my-2'><IconName.FaPencilAlt /></button>
                        </div>
                        <div className="col-auto botones">
 
                          <button onClick={() => cliente.id && confirmacionBorrado(cliente.id) } className='btn btn-danger my-2'><IconName.FaTrashAlt /></button>
                          
                        </div>
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
  )
}


export default ListaCliente;