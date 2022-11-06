import React, { useContext, useEffect, useState } from 'react';
import { AuthProvider } from '../../Context/AuthContext';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user,logOut} = useContext(AuthProvider);
    console.log(user)
    const [orders,setOrders] = useState([])
  
    useEffect(() => {
        fetch(`https://genius-car-server-coral-chi.vercel.app/orders?email=${user?.email}`,{
          headers:{
            authorization:`Bearer ${localStorage.getItem('car-token')}`
          }
        })
            .then(res => {
              if(res.status === 401 || res.status === 403){
              return logOut();
              }
              return res.json()
            })
            .then(data => setOrders(data))
    }, [user?.email,logOut])

    const handleDelete = id =>{
      const proceed= window.confirm('ARE U SuRE?');
      if(proceed){
          fetch(`https://genius-car-server-coral-chi.vercel.app/orders/${id}`,{
              method:'DELETE',
                headers:{
                  authorization:`Bearer ${localStorage.getItem('car-token')}`
                }
          })
          .then(res=>res.json())
          .then(data => {
              console.log(data);
              if(data.deletedCount>0){
                alert('deleted successfully');
                const remaining = orders.filter(odr => odr._id !== id);
                setOrders(remaining)
              }
          })
      }
      }
const handleStatusUpdate = id=>{
  fetch(`https://genius-car-server-coral-chi.vercel.app/orders/${id}`,{
    method:'PATCH',
    headers:{
      'content-type':'application/json',
      authorization:`Bearer ${localStorage.getItem('car-token')}`

    },
    body:JSON.stringify({status:'Approved'})

  })
  .then(res => res.json())
  .then(data =>{
console.log(data);
if(data.modifiedCount > 0 ){
  const remaining = orders.filter(odr =>odr._id !== id);
  const approving = orders.find(odr => odr._id === id );
  approving.status= 'approved'

  const newOrders = [...remaining,approving];
  setOrders(newOrders);
}
  })
}
    return (
        <div>
            <h2>Order:{orders.length}</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     {
        orders.map(order => <OrderRow
            key={order._id}
            order={order}
            handleDelete={handleDelete}
            handleStatusUpdate={handleStatusUpdate}
        ></OrderRow>)
     }
     
    </tbody>  
  </table>
</div>
        </div>
    );
};

export default Orders;