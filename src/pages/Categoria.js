import React, { useEffect, useRef, useState } from 'react'
import axios from '../services/axios'
import swal from 'sweetalert';
import * as  IconName from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router'

function Categoria() {

    const history = useHistory();
    const params = useParams();
    const inicialState = { id: '', nombreCategoria: '', descripcion: '', }
    const [categoriaForm, setCategoriaForm] = useState(inicialState)
    const [categorias, setCategorias] = useState([])

    async function listadoCategorias() {
        const a = await axios.get('categoria')
        const b = a.data.categoria
        console.log(a)
        setCategorias(b)
      } 

    const handleSubmit = (e) => {
   
        console.log(categoriaForm.nombreCategoria);
        
       
        {params.id ? (
          axios.put(`categoria/${params.id}`, {
            nombreCategoria: categoriaForm.nombreCategoria,
            descripcion: categoriaForm.descripcion,
          })
            .then(function (response) {
              console.log(response);
              setCategoriaForm(inicialState)
              listadoCategorias();
            })
            .catch(function (error) {
              console.log(error);
            })
        ) : (
            axios.post('categoria', {
            nombreCategoria: categoriaForm.nombreCategoria,
            descripcion: categoriaForm.descripcion,
          })
            .then(function (response) {
              console.log(response);
              setCategoriaForm(inicialState)
              listadoCategorias();
            })
            .catch(function (error) {
              console.log(error);
            })
        )} 
        
        
        
        
        
      }
      const handleDelete = (categoriaId) => {
        console.log(categoriaId);
        axios.delete(`categoria/${categoriaId}`)
          .then(function (response) {
            console.log(response);
            setCategoriaForm(inicialState);
            listadoCategorias();
            history.push('/categoria')
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
            setCategoriaForm(inicialState);
            history.push('/categoria')
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
            setCategoriaForm(inicialState);
            swal("El registro ha sido guardado", {
              icon: "success",
            });
          } else {
            swal("registro cancelada");
            setCategoriaForm(inicialState);
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

      useEffect(() => {
        listadoCategorias();
      }, [])

      const handleInputChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
    
        setCategoriaForm({ ...categoriaForm, [e.target.name]: e.target.value })
      }
    return (
        <div>
            <div className="container">
                <h1 className='text-center'>Categorias</h1>
                <div className="row">
                    <div className="col-md-4 pt-3">
                        <form >
                            <div className="mb-2">
                                <label className="form-label">Nombre</label>
                                <input type="text" name="nombreCategoria" minLength="2" value={categoriaForm.nombreCategoria} onChange={handleInputChange}  maxLength="50"
                                    className="form-control" autoFocus required />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Descripción </label>
                                
                                    <textarea name="descripcion" rows="4" cols="40" value={categoriaForm.descripcion} onChange={handleInputChange} ></textarea>
                            </div>

                            <div className="d-grid gap-2">
                                {params.id ? (
                                    <button type="button" onClick={confirmarActualizacion} className="btn btn-block btn-info">
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
                                    <button onClick={() => {
                                        setCategoriaForm(inicialState)
                                        history.push('/categoria')
                                    }} type="submit" className="btn btn-block btn-danger">
                                        Cancelar
                                    </button>

                                )}
                            </div>






                        </form>
                    </div>
                    <div className="col-md-8 pt-4">
                        <table className='table table-bordered border-dark'>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">descripcion</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map(categoria => {
                                    return (

                                        <tr key={categoria.id}>

                                            <td>{categoria.id}</td>
                                            <td>{categoria.nombreCategoria}</td>
                                            <td>{categoria.descripcion}</td>
                                            <td>
                                                <div className="col-md-6">
                                                    <button onClick={() => {
                                                        setCategoriaForm(categoria)
                                                        console.log(categoria)
                                                        history.push(`/categoria-actualizar/${categoria.id}`)
                                                    }} className='btn btn-info my-2'><IconName.FaPencilAlt /></button>
                                                </div>
                                                <div className="col-md-6">

                                                    <button onClick={() => categoria.id && confirmacionBorrado(categoria.id)} className='btn btn-danger my-2'><IconName.FaTrashAlt /></button>

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
        </div>
    )
}

export default Categoria
