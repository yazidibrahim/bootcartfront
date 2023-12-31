import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AdminHome({ userData }) {

    //setting state
    const [data, setData] = useState([
      
    ]);
    const[card,setCard]=useState([]);
    useEffect(() => {
         getAllUser();
   
      }, []);
    const getAllUser = () => {
        fetch("http://localhost:5000/getAllUser", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userData");
            setData(data.data);
          });
      };
      const getCard = () => {
        fetch("http://localhost:5000/getItems", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(card, "cardItem");
            setData(card.data);
          });
      };

//logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };
  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3> Admin</h3>
        <table style={{ width: 500 }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Photo</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td><img src={i.profileImage}/></td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname)}
                  />
                </td>
              </tr>
            );
          })}
        </table> 
        <table style={{ width: 500 }}>
          <tr>
            <th>product id</th>
            <th>Email</th>
            <th>Location</th>
          </tr>
       {card.map((i) => {
            return (
              <tr>
                <td>{i.pId}</td>
                <td>{i.email}</td>
                <td>{i.location}</td>
              </tr>
            );
          })}
        </table><button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </div>
  );
}