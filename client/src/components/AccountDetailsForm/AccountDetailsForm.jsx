import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/store";
import {} from "react-router-dom";
export default function AccountDetailsForm() {
  
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({
    email: "",
    name: "",
    lastname: "",
    address: "",
    password: "",
    image:"",

   
  });

  const fetchUser = async () => {
    try {
      const userDB = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/user/findUser`,
        {
          id: state.user,
        }
      );
      setUser(userDB.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (state.user) {
      fetchUser();
    }
  }, []);
 
  let { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, /* lastname, address, image, password */ } =
      user;
      console.log(id)

    try {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/user/details/${id}`, {
        email,
         name,
    /*      lastname,        
         address, 
         image,
         password */
      });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit profile</h2>
      <form onSubmit={handleSubmit}>
      <div className="divInputUser">
      <label className="title">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}        
          onChange={handleChange}
        />
        </div>
          <div className="divInputUser">
          <p className="title">Name: </p>
        <input
          type="text"
          name="name"         
          value={user.name}
          onChange={handleChange}
        />
      </div>
      {/*
         
         <div className="divInputUser">
         <p className="title">lastname: </p>
        <input
          type="text"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
        />
        
         </div>
         <div className="divInputUser">
         <p className="title">address: </p>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />         
         </div>  
         <div className="divInputUser">
         <p className="title">password: </p>
        <input
          type="text"
          name="password"
          placeholder="Password..."
          value={user.password}
          onChange={handleChange}
        />         
         </div>  
         <div className="divInputUser">
         <p className="title">Image: </p>
            <input
              type="text"
              name="image"
              placeholder="Image..."
              onChange={handleChange}
              value={user.image}
            />
          </div>  */}      
        <div className="btn-login">
        <input type="submit"  name="Update info" className="input-submit"/>
        </div>
        
      </form>

    </div>
  )
}
