import React, { useEffect, useState } from "react";

const OrderRow = ({order,handleDelete,handleStatusUpdate}) => {
    const {_id,serviceName,price,email,customer,message,phone,service,status} = order;
const [orderService,setOrderService] = useState({})

useEffect(() => {
    // console.log(service,_id,order);
    fetch(`http://localhost:5000/services/${_id}`)
        .then(res => res.json())
        .then(data => setOrderService(data))
        console.log(orderService);
},[])


  return (
    <div>
      <tr>
        <th>
          <label>
           <button onClick={()=>handleDelete(_id)} className="btn btn-ghost btn-outline btn-error">x</button>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
               { orderService?.img && 
               
               <img
                  src={orderService.img}
                  alt="Avatar Tailwind CSS Component"
                />}
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
         {serviceName}
          <br />
          <span className="badge badge-ghost badge-sm">
           {message}
          </span>
        </td>
        <td>Purple</td>
        <th>
          <button onClick={()=>handleStatusUpdate(_id)} className="btn btn-warning btn-xs">{status ? status :'pending'}</button>
        </th>
      </tr>
    </div>
  );
};

export default OrderRow;
