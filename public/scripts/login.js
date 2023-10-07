document.getElementById("login").addEventListener("click", (event) => {
  //prevenir la recarga
  event.preventDefault();
  //componer el objeto a enviar al servidor
  let data = {
    mail: document.querySelector('#mail').value,
    password: document.querySelector('#password').value,
  };
  let config = {
    method: 'POST',
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(data)
  };
  //fetchear y manejar la respuesta
  fetch('/api/auth/login',config)
    .then((res) => res.json())
    .then(res => console.log(res.user))
    .catch(err=>console.log(err));
});

document.getElementById("signout").addEventListener("click", (event) => {
  //prevenir la recarga
  event.preventDefault();
  let config = {
    method: 'POST',
    headers: { "Content-Type":"application/json" }
  };
  //fetchear y manejar la respuesta
  fetch("/api/auth/signout", config).catch
    .then((res) => res.json())
    .then(res => console.log(res))
    .catch(err=>console.log(err));
});