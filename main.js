// tablero completo
const tablero = document.getElementById("tablero");

// boton de reset
const reset = document.getElementById("reset");

// escribir resultado
const resultado = document.getElementById("resultado");

// turno
let movimiento = "X";

// contenedor de los elementos y stados
let objetos = [];

// lineas ganadoras
const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// ganador
function win(){
    for(let i=0;i<lineas.length;i++){
        const [a,b,c] = lineas[i]
        if(
            objetos[a].stado!=""&&
            objetos[a].stado==objetos[b].stado&&
            objetos[a].stado==objetos[c].stado
        ){
            return true
        }
    }
    return false
}
function retirar(){
    for(let i=0;i<objetos.length;i++){
        objetos[i].elemento.onclick=false;
    }
}
// tablas
class Tabla{
    constructor(elemento){
        this.elemento=elemento;
        this.stado="";
    }
    // funcionalidad del juego 
    jugada(){
        this.stado=movimiento;
        this.elemento.innerHTML=movimiento=="X"? '<p style="color:red">X</p>':'<p style="color:blue">O</p>'
        this.elemento.onclick=false;
        if(win()){
            resultado.innerHTML=`Ganaste ${movimiento}`;
            resultado.style.display="block";
            retirar()
        }
        // empate 
        if(!win()&&objetos.every(x=>x.stado!="")){
            resultado.innerHTML="Empate";
            resultado.style.display="block";
            retirar()
        }
        movimiento=="X"? (movimiento="O"):(movimiento="X")
    }
}
// Inicio
function inicio(){
for(let i=0;i<9;i++){
    const elemento = document.createElement("div");
    const obj = new Tabla(elemento);
    elemento.onclick=()=>obj.jugada();
    objetos.push(obj);
    tablero.append(elemento);
}
}
inicio()

// RESET
reset.onclick=()=>{
    objetos=[];
    tablero.innerText="";
    resultado.innerHTML="";
    resultado.style.display="none"
    inicio()
};