import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthProvider } from '../../Context/AuthContext';

const CheckOut = () => {
    const service= useLoaderData();
    const{title,price}= service;
    const {user,_id} = useContext(AuthProvider);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form= event.target;
        const name= `${form.first.value} ${form.last.value}`
        const email= user?.email || 'unregistered';
        const message= form.message.value;
        const phone = form.phone.value;

        const order={
            service:_id,
            serviceName:title,
            price,
            customer:name,
            email,
            phone,
            message
        }
        if(phone.length<11){
            alert('phone number should be 11 digit')
        }

        fetch('http://localhost:5000/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                form.reset();
                alert('Order Placed SuccessFully')
            }
        })
        .catch(er => console.error(er))

    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl text-center text-orange-600'>{title}</h2>
                <h4 className='text-2xl text-center text-orange-600 my-5'>price:$ {price}</h4>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
           <input name="first" type="text" placeholder="First Name" className="input input-bordered border-warning w-full " />
            <input name="last" type="text" placeholder="Last Name" className="input input-bordered border-warning w-full " />
            <input name="email" type="text" placeholder="Email" defaultValue={user?.email} className="input input-bordered border-warning w-full " readOnly/>
            <input name="phone" type="text" placeholder="Your Phone" className="input input-bordered border-warning w-full " required />
           </div>
           <textarea name="message" className="textarea textarea-error my-5" placeholder="Additional Message"></textarea>

           <input  type="submit" className='btn text-center mx-auto ml-96 mt-8 btn-outline btn-secondary' value="Place Your Order" />
            </form>
        </div>
    );
};

export default CheckOut;