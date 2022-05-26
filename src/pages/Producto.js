import React, { useEffect, useRef, useState } from 'react'
import axios from '../services/axios'
import swal from 'sweetalert';
import * as  IconName from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router'

function Producto() {
  const [categoriax, setCategoriax] = useState([])
  const history = useHistory();
  const params = useParams();
  const inicialState = { id: '', nombreProducto: '', precio: '', stock: '', categoria_id: ''}
  const [productoForm, setProductoForm] = useState(inicialState)
  const [productos, setProductos] = useState([])

  
  async function listadoProductos() {
    const a = await axios.get('producto')
    const b = a.data.Productos
    console.log(b)
    setProductos(b)
  }

  async function listadoCategorias() {
    const a = await axios.get('categoria')
    setCategoriax(a.data.categoria)
    console.log(a.data.categoria)
   

  }


  const handleInputChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    console.log('asdasd',e.target.value)
    setProductoForm({ ...productoForm, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    listadoProductos();
    listadoCategorias();

  }, [])

  const handleSubmit = (e) => {
   
 
    
   
    {params.id ? (
      axios.put(`producto/${params.id}`, {
        nombreProducto: productoForm.nombreProducto,
        precio: productoForm.precio,
        stock: productoForm.stock,
        categoria_id: productoForm.categoria_id,
      
      })
        .then(function (response) {
          console.log(response);
          setProductoForm(inicialState)
          listadoProductos();
        })
        .catch(function (error) {
          console.log(error);
        })
    ) : (
        axios.post('producto', {
            nombreProducto: productoForm.nombreProducto,
            precio: productoForm.precio,
            stock: productoForm.stock,
            categoria_id: productoForm.categoria_id,
      })
        .then(function (response) {
          console.log(response);
          setProductoForm(inicialState)
          listadoProductos();
        })
        .catch(function (error) {
          console.log(error);
        })
    )} 
    
    
    
    
    
  }
  const handleDelete = (productoId) => {
    console.log(prompt);
    axios.delete(`producto/${productoId}`)
      .then(function (response) {
        console.log(response);
        setProductoForm(inicialState);
        listadoProductos();
        history.push('/producto')

        
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
        setProductoForm(inicialState);
        history.push('/producto')
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
        setProductoForm(inicialState);
        swal("El registro ha sido guardado", {
          icon: "success",
        });
      } else {
        swal("registro cancelada");
        setProductoForm(inicialState);
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
    <div>
      <div className="container">
          <div className="row">
          <div className="col-md-4 pt-3">
            <form >
              <div className="mb-2">
                <label className="form-label">Nombre Producto</label>
                <input type="text" name="nombreProducto" value={productoForm.nombreProducto} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control" autoFocus required />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio</label>
                <input type="number" name="precio" value={productoForm.precio} onChange={handleInputChange} minLength="2" maxLength="50"
                  className="form-control" required />
              </div>
              <div className="mb-2">
                <label className="form-label">stock</label>
                <input type="number" name="stock" value={productoForm.stock} onChange={handleInputChange} className="form-control" min="1900" max="2020" required />
              </div>
                <div className='mb-2'>
                   <>
                   <label className="form-label">Categoria</label>
                   <select name="categoria_id" onChange={handleInputChange} className='form-control' >
                        {
                        categoriax.map(categoria=>{
                        return (
                            <option  key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
                            
                        )
                        })
                        }
                    </select>
                   </>
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
                    setProductoForm(inicialState)
                    history.push('/producto')
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
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => {
                  return (

                    <tr key={producto.id}>

                      <td>{producto.id}</td>
                      <td>{producto.nombreProducto}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.stock}</td>
                      <td>{producto.categoria__nombreCategoria}</td>
                      <td>

                        <div className="col-md-6">
                          <button onClick={() => {
                            setProductoForm(producto)
                            history.push(`/producto-actualizar/${producto.id}`)
                          } }  className='btn btn-info my-2'><IconName.FaPencilAlt /></button>
                        </div>
                        <div className="col-md-6">
 
                          <button onClick={() => producto.id && confirmacionBorrado(producto.id) } className='btn btn-danger my-2'><IconName.FaTrashAlt /></button>
                          
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

export default Producto
