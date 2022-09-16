import React from 'react'

function auth() {
    const token = localStorage.getItem("TOKEN");
    console.log(token)
  return localStorage.getItem("TOKEN") !== null;
}

export default auth