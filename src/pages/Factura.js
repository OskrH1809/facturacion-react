import React, { useEffect, useState } from 'react'
import axios from '../services/axios'
import swal from 'sweetalert';
import * as  IconName from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router'
import Producto from './Producto';




function Factura() {
    const history = useHistory();
    const params = useParams();
    const inicialState = { id: '', nombreProducto: '', precio: '', stock: '', categoria_id: '' }
    const inicialStateDetalle = {
        "facturaId_id": '',
        "producto_id": '',
        "cantidad": '',
        "precio": ""
    }
    const [productoForm, setProductoForm] = useState(inicialState)
    const [clientes, setClientes] = useState([])
    const [detalleFactura, setDetalleFactura] = useState([])

    let subTotalPrimary=0;

    const [productos, setProductos] = useState([])
    const inicialStateForm = { id: '', cliente_id: '', fechaFactura: '', }
    const [facturaForm, setFacturaForm] = useState(inicialStateForm)
    const [detalleForm, setDetalleForm] = useState(inicialStateDetalle)

    async function listadoclientes() {
        const a = await axios.get('cliente')
        const b = a.data.Clientes
        console.log(b)
        setClientes(b)
        console.log(clientes)
    }

    async function listadoProductos() {
        const a = await axios.get('producto')
        const b = a.data.Productos
        console.log(b)
        setProductos(b)
        console.log(productos)
    }

    async function listadoDetalle() {
        const a = await axios.get('detalle')
        const b = a.data.Detalles
        console.log(b)
        setDetalleFactura(b)
        console.log(b)
    }

    const handleInputChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        console.log('asdasd', e.target.value)
        setFacturaForm({ ...facturaForm, [e.target.name]: e.target.value })
        console.log(e.target.name)
    }


    const handleInputChangeDetalle = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        console.log('detalleForm', e.target.value)
        setDetalleForm({ ...detalleForm, [e.target.name]: e.target.value })
        console.log(detalleForm)
    }

    const handleInputChangeFilter = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        console.log('asdasd', e.target.name)
        setProductoForm({ ...productoForm, [e.target.name]: e.target.value })
        console.log(productoForm.nombreProducto)
    }

    useEffect(() => {
        listadoclientes();
        listadoProductos();
        listadoDetalle();

    }, [])

    const confirmarRegistrar = () => {
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
                    swal("El registro ha sido guardado", {
                        icon: "success",
                    });
                } else {
                    swal("registro cancelada");
                }
            });
    }

    const handleSubmit = (e) => {

        axios.post('factura', {
            cliente_id: facturaForm.cliente_id


        })
            .then(function (response) {
                console.log(response.data.id);
                console.log(facturaForm.cliente_id)
                history.push(`/factura-detalle/${response.data.id}`)


            })
            .catch(function (error) {
                console.log(error);
            })

    }

    const confirmarRegistrarDetalle = () => {
        swal({
            title: "Desea guardar el registro?",
            text: "Guardara el registro en el sistema",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then((willCreate) => {
                if (willCreate) {
                    handleSubmitDetalle()
                    swal("El registro ha sido guardado", {
                        icon: "success",
                    });
                } else {
                    swal("registro cancelada");
                }
            });
    }

    const contadorSubtotal = (s) => {

    }

    const handleSubmitDetalle = (e) => {

        axios.post('detalle', {
            factura_id: params.id,
            producto_id: facturaForm.producto_id,
            cantidad: detalleForm.cantidad,
            precio: detalleForm.precio


        })
            .then(function (response) {
                console.log(response.data.id);
                console.log(facturaForm.cliente_id)
                listadoDetalle();
                history.push(`/factura-detalle/${params.id}`)


            })
            .catch(function (error) {
                console.log(error);
            })


    }


    const confirmacionBorradoDetalle = (id) => {
        swal({
            title: "Desea eliminar este registro?",
            text: "Este registro se borrara de forma permanente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    handleDeleteDetalle(id)
                    swal("El registro ha sido eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Eliminacion cancelada");
                }
            });
    }



    const handleDeleteDetalle = (clienteId) => {
        console.log(clienteId);
        axios.delete(`detalle/${clienteId}`)
            .then(function (response) {
                console.log(response);
                listadoDetalle();

                history.push(`/factura-detalle/${params.id}`)


            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="container ">
                <div className="row ">
                    <h1 className='text-center'>Factura</h1>
                    <div className="col-md-12">
                        {params.id ? (
                           <div className="row"></div>
                            // --------------------------------------------

                            // -------------------------------------------

                        ) : (
                            <div className="row factura mb-3">
                                <div className=" col-md-12 pt-4">
                                    <form className="row g-3 formulario">
                                        <div className=' col-auto mb-2'>
                                            <>

                                                <select name="cliente_id" onChange={handleInputChange} className='form-control' >
                                                    <option selected defaultValue={null} disabled>Seleccione un cliente</option>
                                                    {
                                                        clientes.map(cliente => {
                                                            return (
                                                                <option key={cliente.id} value={cliente.id}>{`${cliente.id}-${cliente.nombreCliente} ${cliente.apellidoCliente}`}</option>

                                                            )
                                                        })
                                                    }
                                                </select>
                                            </>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" onClick={confirmarRegistrar} className="btn btn-primary mb-3">Crear Factura</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        )

                        }
                        {
                            params.id && (
                                <div className="row factura">
                                    <div className=" col-md-12 pt-3 mb-3">
                                        <h3>Factura #{params.id}</h3>
                                        <hr />
                                        <form className="row g-3 formulario">
                                            <div className=' col-auto mb-2'>
                                                <>
                                                    <div className="mb-3">
                                                        <label className="form-label">Nombre Producto</label>
                                                        <input name='nombreProducto' type="email" onChange={handleInputChangeFilter} className="form-control" id="exampleFormControlInput1" placeholder="Buscar" />
                                                    </div>

                                                    <select name="producto_id" onChange={handleInputChange} className='form-control' >

                                                        {
                                                            productoForm.nombreProducto ? (
                                                                productos.filter(e => e.nombreProducto.includes(productoForm.nombreProducto)).map(producto => {
                                                                    return (
                                                                        <option key={producto.id} value={producto.id}>{`${producto.nombreProducto} `}</option>

                                                                    )
                                                                })
                                                            )
                                                                : (
                                                                    productos.map(producto => {
                                                                        return (
                                                                            <option key={producto.id} value={producto.id}>{`${producto.nombreProducto} `}</option>

                                                                        )
                                                                    })
                                                                )
                                                        }
                                                    </select>



                                                </>
                                            </div>
                                            <div className="col-auto "> 
                                                <label className="form-label">Cantidad </label><br />
                                                <input type="bumber" name='cantidad' className='form-control' onChange={handleInputChangeDetalle} value={detalleForm.cantidad} />
                                            </div>
                                            <div className="col-auto ">
                                                <label className="form-label">Precio </label> <br />
                                                <input type="bumber" name='precio' className='form-control' onChange={handleInputChangeDetalle} value={detalleForm.precio} />
                                            </div>


                                            <div className="col-auto pt-2 ">
                                                <br />
                                                <button type='button' onClick={confirmarRegistrarDetalle} className='btn btn-success '> Agregar nuevos productos</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            )
                        }




                        {
                            params.id && (
                                <div className="row factura">
                                    <div className=" col-md-12 pt-3 mb-3">
                                        <table className='table  border-dark table-striped-columns'>
                                            <thead className="thead-dark">
                                                <tr className=''>
                                                    <th scope="col">id</th>
                                                    <th scope="col">Nombre Producto</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Precio</th>
                                                    <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detalleFactura.filter(e => e.factura_id == params.id).map(detalle => { 
                                                    const subTotal = (detalle.cantidad * parseFloat(detalle.precio))
                                                    const contador = subTotal + subTotalPrimary
                                                    console.log(subTotal)
                                                    subTotalPrimary = contador;
                                                    console.log(subTotal)

                                                    return (

                                                        <tr key={detalle.id}>

                                                            <td>{detalle.id}</td>
                                                            <td>{detalle.producto__nombreProducto}</td>
                                                            <td>{detalle.cantidad}</td>
                                                            <td>{detalle.precio}</td>

                                                            <td>
                                                                <div className="col-md-6">

                                                                    <button onClick={() => detalle.id && confirmacionBorradoDetalle(detalle.id)} className='btn btn-danger my-2'><IconName.FaTrashAlt /></button>

                                                                </div>



                                                            </td>


                                                        </tr>



                                                    )

                                                })

                                                }
                                                <tr>
                                                    <th scope="row">SubTotal</th>
                                                    <td colSpan="2"></td>
                                                    <td colSpan="1"></td>
                                                    <td>{parseFloat(subTotalPrimary)}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Impuesto</th>
                                                    <td colSpan="2"></td>
                                                    <td colSpan="1"></td>
                                                    <td>{parseFloat(subTotalPrimary*0.15)}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total</th>
                                                    <td colSpan="2"></td>
                                                    <td colSpan="1"></td>
                                                    <td>{parseFloat(subTotalPrimary)+parseFloat(subTotalPrimary*0.15)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }









                    </div>


                </div>
                <div className="row"></div>
            </div>
        </div>
    )
}

export default Factura
