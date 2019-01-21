const serverURI = 'http://localhost:7965/';
const ACCESS_TOKEN = localStorage.getItem('access_token');

export const sendRequest = (endpoint, requestData) => fetch(serverURI + endpoint, {
  method: 'POST',
  body: JSON.stringify(requestData),
  headers: {
    Authorization: ACCESS_TOKEN,
    'Content-type': 'application/json',
  },
  credentials: 'same-origin',
})
  .then(response => response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
  });


export default sendRequest;
