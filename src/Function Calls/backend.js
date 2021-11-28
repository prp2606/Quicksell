require("dotenv").config();
const GETAPI = process.env.REACT_APP_GETREQ;
const PUTAPI = process.env.REACT_APP_PUTREQ;

export const getCounter = () => {
  return fetch(`${GETAPI}`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Counter obtained");
      return response;
    })
    .catch((error) => console.log("Get error", error));
};

export const putCounter = (counter) => {
  return fetch(`${PUTAPI}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(counter),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("Put error", error));
};
