import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard/ServicesCard';

const Services = () => {
    const [services,setServices] = useState([])
    useEffect(()=>{
    fetch('services.json')
    .then(res => res.json())
    .then(data => setServices(data))
    },[])
        return (
        <div>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600'>Services</p>
                <h2 className='text-5xl font-semibold'>
                    Our Service Area
                </h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate laborum perspiciatis consectetur dolor dolorem aut!
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {
                    services.map(service => <ServicesCard 
                    key={service._id}
                    service={service}
                    ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;