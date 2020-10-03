import React, { useState, useEffect, createContext } from "react";
import jwt from "jsonwebtoken";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState("loading");

  useEffect(() => {
    let token = localStorage.getItem("token"); // string || null

    if (!token) {
      setUser(null);
      setAuthState("done");
    } else {
      token = jwt.decode(token); // object

      if (!expired(token)) {
        setUser(token);
        setAuthState("done");
      } else {
        setUser(null);
        setAuthState("done");
      }
    }
  }, []);

  const expired = (token) => token.exp < Date.now() / 1000;

  function logIn(email, password) {
    return new Promise((resolve, reject) => {
      fetch("/auth/login", {
        method: "POST",
        mode: "no-cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      })
        .then((response) => {
          if (!response.ok) {
            response.json().then((error) => reject(error));
          } else {
            response.json().then((data) => {
              localStorage.setItem("token", data.token);
              const user = jwt.decode(data.token);
              setUser(user);
              resolve();
            });
          }
        })
        .catch((error) => reject(error));
    });
  }

  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, authState, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// function authenticate(token) {
//   return new Promise((resolve, reject) => {
//     fetch("http://localhost:5000/auth/authenticate", {
//       method: "POST",
//       mode: "cors", // no-cors, *cors, same-origin
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           response.json().then((error) => reject(error));
//         } else {
//           response.json().then((success) => resolve(success));
//         }
//       })
//       .catch((error) => reject(error));
//   });
// }
