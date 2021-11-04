
var botonGrabar = document.getElementById("bGrabar");

//Listener del boton grabar
botonGrabar.addEventListener("click", recogerDatos, true);

//Map para recoger todos los objetos
var horarioMap = new Map();
var dias = document.getElementById("cDias");
var hora = document.getElementById("cHora");

//Función que recoge los datos
function recogerDatos() {
    var nombreProf = document.getElementById("cNombre").value;
    var asignatura = document.getElementById("cAsignatura").value;
    var dias = document.getElementById("cDias");
    var diasSeleccion= dias.options[dias.selectedIndex].text;
    var hora = document.getElementById("cHora");
    var horaSeleccion= hora.options[hora.selectedIndex].text;

    //Creo las coordenadas en la tabla que coinciden con el id de cada td y se guardará como key en el map
    var y = (dias.selectedIndex+1).toString();
    var x = (hora.selectedIndex+1).toString();
    var coordenadas  = "c"+x+y;

    //Comprobación de nombres para no guardar nombres equívocos
    if (nombreProf.toUpperCase()!=="FERNANDO" &&  nombreProf.toUpperCase()!=="ANA GLORIA" && nombreProf.toUpperCase()!="DANIEL"  && nombreProf.toUpperCase()!="MARIAN"){
        alert("Nombre no correcto")
    }else if (asignatura.toUpperCase()!=="DWES" &&  asignatura.toUpperCase()!=="DWEC" && asignatura.toUpperCase()!="DI"  && asignatura.toUpperCase()!="DAW"){
        alert("Asignatura no correcta")
    }else{
    //Creamos una variable objeto con los datos introducidos
    var horarioProf = new horarioProfesor (nombreProf,asignatura,diasSeleccion,horaSeleccion);
    //Metemos en el map el objeto junto con sus coordenadas
    horarioMap.set(coordenadas, horarioProf);
    //Por ultimo grabamos los datos en la  tabla
    grabarDatos(coordenadas);}
}

function grabarDatos(coordenadas){
    //Coge el id correspondiente del td e introduce el objeto con la key del map correspondiente
    document.getElementById(coordenadas).innerHTML= horarioMap.get(coordenadas).asign;
}

//Objeto horario
function horarioProfesor(nombre, asign, dias, hora) {
    this.nombre = nombre;
    this.asign = asign;
    this.dias = dias;
    this.hora = hora;
}

//Listener para que al hacer click en una de las td, se asignen a los campos input los valores del map correspondiente
document.querySelector("#tHorario").addEventListener("click", (event)=>{

    document.getElementById("cNombre").value = horarioMap.get(event.target.id).nombre;
    document.getElementById("cAsignatura").value = horarioMap.get(event.target.id).asign;
    dias.selectedIndex = (event.target.id).charAt(2)-1;
    hora.selectedIndex = (event.target.id).charAt(1)-1;

},true);

