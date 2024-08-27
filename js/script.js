const d = document;

const textArea = d.getElementById("textArea");
const muneco = d.querySelector(".img__resultado");
const carga = d.querySelector(".loader");
const resultadoTitulo = d.getElementById("resultado__titulo");
const resultadoTexto = d.getElementById("resultado__texto");
const botonEncriptar = d.getElementById("botonEncriptar");
const botonDesencriptar = d.getElementById("botonDesencriptar");
const botonCopiar = d.getElementById("copiarBtn");



// Conjunto de pares clave-valor (vocal, sustitución) para encriptar texto, reemplazando cada vocal por su correspondiente secuencia.
const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"],
    ["a", "ai"],
];

/* Esta función encripta un mensaje utilizando un conjunto de reglas de sustitución.
El arreglo "llaves" contiene pares de valores: [letra original, letra sustituida].
La función itera sobre cada letra del mensaje y busca su correspondiente en el arreglo "llaves".
Si se encuentra una coincidencia, la letra original se reemplaza por la letra sustituida.*/
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    // Recorre cada letra del mensaje
    for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    // Inicializa la letra encriptada con la letra original
    let encriptada = letra;
    //Busca la letra en el arreglo de llaves
    for (let j = 0; j < llaves.length; j++) {
        if (letra === llaves[j][0]) {
        // Si se encuentra una coincidencia, actualiza la letra encriptada
        encriptada = llaves[j][1];
        break;
        }
    }
    // Agrega la letra encriptada al mensaje encriptado
    mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

/* Esta función desencripta un mensaje utilizando un conjunto de reglas de sustitución.
El arreglo "llaves" contiene pares de valores: [valor original, valor sustituido].
La función itera sobre cada par de llaves y reemplaza todas las ocurrencias del, valor original en el mensaje por el valor sustituido.*/
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
    // Crea una expresión regular para buscar todas las ocurrencias del valor a reemplazar.
    let regex = new RegExp(llaves[i][1], "g");
    // Reemplaza todas las ocurrencias encontradas por el valor correspondiente.
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

textArea.addEventListener("input", (e) => {
    // Oculta el elemento "muneco"
    muneco.style.display = "none";
    // Muestra el elemento "carga" (eliminando la clase "hidden")
    carga.classList.remove("hidden");
    // Actualiza el texto del título a "capturando mensaje."
    resultadoTitulo.textContent = "capturando mensaje.";
    // Limpia el contenido del texto del resultado
    resultadoTexto.textContent = "";
});

botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "el resultado es:";
});

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener("click", () => {
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
    muneco.style.display = "block";
    carga.classList.add("hidden");
    resultadoTitulo.textContent = "el texto se copió";
    });
});