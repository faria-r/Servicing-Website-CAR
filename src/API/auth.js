export const setAuthToken = (user)=>{

    const currentUser = {
        email: user.email
    }
      //get jwt token

      fetch('https://genius-car-server-coral-chi.vercel.app/jwt',{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(currentUser)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //local storage is not the best place to store jwt
        localStorage.setItem('car-token',data.token)
        //   navigate(from,{replace:true})
        
      })
}