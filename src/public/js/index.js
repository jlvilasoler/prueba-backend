const socket = io();

const caja = document.getElementById("caja");
const contenido = document.getElementById('contenido');
caja.addEventListener('change', (e) => {
console.log(e.target.value);
socket.emit('mensaje', {
    user: usuario,
    mensaje: e.target.value,
})
});

let usuario = "";

Swal.fire({
    title: 'Ingresa tu nickname',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'ingresar',
    showLoaderOnConfirm: true,
  }).then((result) => {console.log(result.value)
    usuario = result.value;
  })



socket.on('nuevo_mensaje', (data) => {
    const mensajes = data.map(({user, mensaje}) => {
    return `<p>${user} dijo: ${mensaje}</p>` ;
    });
    contenido.innerHTML = mensajes.join("");
});