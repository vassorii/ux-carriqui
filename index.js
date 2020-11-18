const db = firebase.firestore();


const saveregistro = (nombre, cedula, direccion, catastro, valor) =>
   db.collection("registro").doc().set({
    nombre,
    cedula,
    direccion,
    catastro,
    valor
   })

const catastroform = document.getElementById('catastro-form');
    catastroform.addEventListener('submit', async (e) => {  
        e.preventDefault();

        const nombre = catastroform['name-persona'].value;
        const cedula = catastroform['cedula-persona'].value;
        const direccion = catastroform['direccion-inmueble'].value;
        const catastro = catastroform['catastro-inmueble'].value;
        const valor = catastroform['valor-inmueble'].value;

        await saveregistro(nombre, cedula ,direccion, catastro, valor);

       catastroform.request();

        console.log(nombre, cedula ,direccion ,catastro, valor)
    })
  
