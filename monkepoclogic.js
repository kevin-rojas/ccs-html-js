const selecioneataque=document.getElementById('selecAttack')
const seccionReiniciar=document.getElementById('ButtonRestart')
const botonSelecionarMascota = document.getElementById('Buttonselect')
const botonFuego=document.getElementById('ButtonFire') 
const botonAgua=document.getElementById('ButtonWater')
const botonTierra=document.getElementById('ButtonEarth')
const botonReniciar=document.getElementById('ButtonRestart')
const selecionmascota=document.getElementById('selecPet')
const SpamPetPlayer=document.getElementById('namePetPlayer')
const vidaJugador=document.getElementById('lifePlayer')
const vidaEnemigo = document.getElementById('lifeEnemy')
const seccionMensajes=document.getElementById('resultado')
const ataquejugador=document.getElementById('ataque-jugador')
const ataqueenemigo=document.getElementById('ataque-enemigo')
const contenedorTarjetas=document.getElementById('contenedorTarjetas')


let mokepones=[]
let opcionDeMonkepones
let inputfixer
let inputborcho
let inputterramon
let ataqueJugador
let ataqueEnemigo
let vidasJugador=3
let vidasEnemigo=3

class Mokepon{
  constructor(nombre,foto,vida){
    this.nombre=nombre
    this.foto=foto
    this.vida=vida
    this.ataques=[]
  }
}
let fixer=new Mokepon ('Fixer','/img/fixer.png',5)
let borcho=new Mokepon ('Borcho','/img/borcho.png',5)
let terramon=new Mokepon ('Terramon','/img/Terramon.png',5)

fixer.ataques.push(
    {nombre:'🔥',id:'ButtonFire'},
    {nombre:'🔥',id:'ButtonFire'},
    {nombre:'🔥',id:'ButtonFire'},
    {nombre:'💧',id:'ButtonWater'},
    {nombre:'🌱',id:'ButtonEarth'},
)
borcho.ataques.push(
    {nombre:'💧',id:'ButtonWater'},
    {nombre:'💧',id:'ButtonWater'},
    {nombre:'💧',id:'ButtonWater'},
    {nombre:'🔥',id:'ButtonFire'},
    {nombre:'🌱',id:'ButtonEarth'},
)
terramon.ataques.push(
    {nombre:'🌱',id:'ButtonEarth'},
    {nombre:'🌱',id:'ButtonEarth'},
    {nombre:'🌱',id:'ButtonEarth'},
    {nombre:'🔥',id:'ButtonFire'},
    {nombre:'💧',id:'ButtonWater'},
)
mokepones.push(fixer,borcho,terramon)

function iniciarJuego (){
    selecioneataque.style.display='none'
    seccionReiniciar.style.display='none'
    mokepones.forEach((mokepon)=>{
        opcionDeMonkepones=`
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label for=${mokepon.nombre} class="tarjeta-de-monkepo">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="Fixer">
        </label>
        `
        contenedorTarjetas.innerHTML+=opcionDeMonkepones
        inputfixer=document.getElementById('Fixer')
        inputborcho=document.getElementById('Borcho')
        inputterramon=document.getElementById('Terramon')

    })

    botonSelecionarMascota.addEventListener('click',selecionarMascota) 
    botonFuego.addEventListener('click',ataqueFuego)
    botonAgua.addEventListener('click',ataqueAgua)
    botonTierra.addEventListener('click',ataqueTierra)
    botonReniciar.addEventListener('click',reiciarJuego)
}

function selecionarMascota(){
    selecionmascota.style.display='none'
    selecioneataque.style.display='flex'
    if(inputfixer.checked ){ 
        SpamPetPlayer.innerHTML='Fixer'
    }else if(inputborcho.checked){
        SpamPetPlayer.innerHTML='Borcho'
    }else if(inputterramon.checked){
        SpamPetPlayer.innerHTML='Terramon'
    }else{
        alert("Seleccione una mascota")
    }   
    selectPetEnemy()
}

function selectPetEnemy(){
    let spamPetEnemy=document.getElementById('namePetEnemy')
    let mascotaAleatorio=aleatorio(1,3)
    if(mascotaAleatorio==1){
        spamPetEnemy.innerHTML='Fixer'
    }else if(mascotaAleatorio==2){
        spamPetEnemy.innerHTML='Borcho'
    }else {
        spamPetEnemy.innerHTML='Terramon'
    }

}

function ataqueFuego(){
    ataqueJugador='FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador='AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador='TIERRA'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatoreo=aleatorio(1,3)
    if(ataqueAleatoreo==1){
        ataqueEnemigo='FUEGO'
    }else if (ataqueAleatoreo==2){
        ataqueEnemigo='AGUA'
    }else{
        ataqueEnemigo='TIERRA'
    }
    combate()
}

function combate() {
    

    if(ataqueJugador==ataqueEnemigo){
        crearMensaje("EMPATE")
    }else if (ataqueJugador=='FUEGO' && ataqueEnemigo=='TIERRA'){
        crearMensaje("GANASTE")
        vidasEnemigo--
        vidaEnemigo.innerHTML=vidasEnemigo
    }else if (ataqueJugador=='AGUA' && ataqueEnemigo=='FUEGO'){
        crearMensaje("GANASTE")
        vidasEnemigo--
        vidaEnemigo.innerHTML=vidasEnemigo
   
    }else if (ataqueJugador=='TIERRA' && ataqueEnemigo=='AGUA'){
        crearMensaje("GANASTE")
        vidasEnemigo--
        vidaEnemigo.innerHTML=vidasEnemigo
        
    }else{
        crearMensaje("PERDIO")
        vidasJugador--
        vidaJugador.innerHTML=vidasJugador 
    }
    revisarvidas()
}

function revisarvidas(){
    if(vidasJugador==0){
        crearMensajeFinal("PERDISTE LA BATALLA")
    }else if (vidasEnemigo==0){
        crearMensajeFinal("GANASTE LA BATALLA")
    }
}

function crearMensaje(resultado){
    let nuevoataquejugador=document.createElement('p')
    let nuevoataqueenemigo=document.createElement('p')

    seccionMensajes.innerHTML=resultado
    nuevoataquejugador.innerHTML=ataqueJugador
    nuevoataqueenemigo.innerHTML=ataqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML='Tu mascota ataco con' +ataqueJugador+', la mascota del enemigo ataco con '+ataqueEnemigo+' - '+resultado
    
    ataquejugador.appendChild(nuevoataquejugador)
    ataqueenemigo.appendChild(nuevoataqueenemigo)
}
function crearMensajeFinal(resultadofinal){
    seccionMensajes.innerHTML=resultadofinal
    botonFuego.disabled=true
    botonAgua.disabled=true
    botonTierra.disabled=true
    seccionReiniciar.style.display='block'
}

function reiciarJuego(){
    location.reload()
}

function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego)