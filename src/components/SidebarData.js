import React from "react";

import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
import * as IconName  from "react-icons/fa";

export const SidebarData=[
{
    title:'Inicio',
    path:'/',
    icon:<IconName.FaWarehouse/>,
    cname:'nav-text'
},
{
    title:'Cliente',
    path:'/cliente',
    icon:<IconName.FaRegUser/>,
    cname:'nav-text'
},
{
    title:'Categoria',
    path:'/categoria',
    icon:<FaIcons.FaBuffer/>,
    cname:'nav-text'
},
{
    title:'Producto',
    path:'/producto',
    icon:<FaIcons.FaCartPlus/>,
    cname:'nav-text'
},
{
    title:'Factura',
    path:'/factura',
    icon:<FaIcons.FaCashRegister/>,
    cname:'nav-text'
}


]