const selecioneataque=document.getElementById('selecAttack')
const seccionReiniciar=document.getElementById('ButtonRestart')
const botonSelecionarMascota = document.getElementById('Buttonselect')
const botonReniciar=document.getElementById('ButtonRestart')
const selecionmascota=document.getElementById('selecPet')
const SpamPetPlayer=document.getElementById('namePetPlayer')
const vidaJugador=document.getElementById('lifePlayer')
const vidaEnemigo = document.getElementById('lifeEnemy')
const seccionMensajes=document.getElementById('resultado')
const ataquejugador=document.getElementById('ataque-jugador')
const ataqueenemigo=document.getElementById('ataque-enemigo')
const contenedorTarjetas=document.getElementById('contenedorTarjetas')
const spamPetEnemy=document.getElementById('namePetEnemy')
const contenedorAtaques=document.getElementById('contenedorAtaques')
const sectionMapa=document.getElementById('vermapa')
const mapa=document.getElementById('mapa')


let mokepones=[]
let mascotaJugadorObj
let indexAtaqueEnemigo
let indexAtaqueJugador
let opcionDeMonkepones
let botonFuego
let botonAgua
let botonTierra
let inputfixer
let inputborcho
let inputterramon
let mascotaJugador
let ataqueJugador = []
let ataquesMokepones
let AataquesMokeponesEnemigo
let ataqueEnemigo=[]
let botones = []
let victoriasJugador=0
let victoriasEnemigo=0
let vidasJugador=3
let vidasEnemigo=3
let lienzo=mapa.getContext("2d")
let intervalo
let mapaBackground= new Image()
mapaBackground.src='./img/mapa.jpg'


class Mokepon{
  constructor(nombre,foto,vida,fotoMapa,x=10,y=10){
    this.nombre=nombre
    this.foto=foto
    this.vida=vida
    this.ataques=[]
    this.x=x
    this.y=y
    this.ancho=80
    this.alto=80
    this.mapaFoto=new Image()
    this.mapaFoto.src=fotoMapa
    this.velocidadx=0
    this.velocidady=0
  }
}
let fixer=new Mokepon ('Fixer','/img/fixer.png',5,'./img/cabeza1.png')
let borcho=new Mokepon ('Borcho','/img/borcho.png',5,'./img/borcho.png')
let terramon=new Mokepon ('Terramon','/img/Terramon.png',5,'./img/Terramon.png')

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
    sectionMapa.style.display='none'
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
    
    botonReniciar.addEventListener('click',reiciarJuego)
}

function selecionarMascota(){
    selecionmascota.style.display='none'
    //selecioneataque.style.display='flex'
    if(inputfixer.checked ){ 
        SpamPetPlayer.innerHTML=inputfixer.id
        mascotaJugador=inputfixer.id
    }else if(inputborcho.checked){
        SpamPetPlayer.innerHTML=inputborcho.id
        mascotaJugador=inputborcho.id
    }else if(inputterramon.checked){
        SpamPetPlayer.innerHTML=inputterramon.id
        mascotaJugador=inputterramon.id
    }else{
        alert("Seleccione una mascota")
    }  
    extraerAtaque(mascotaJugador) 
    selectPetEnemy()
    sectionMapa.style.display='flex'
    iniciarMapa()
}
function extraerAtaque(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador==mokepones[i].nombre) {
            ataques=mokepones[i].ataques
        }
        
    }       
    mostrarAtques(ataques)
}
function mostrarAtques(ataques){
   ataques.forEach(ataque => {
    ataquesMokepones=`
    <button id=${ataque.id} class="botonAtaque BAtaque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML+=ataquesMokepones
   });
   botonFuego=document.getElementById('ButtonFire') 
   botonAgua=document.getElementById('ButtonWater')
   botonTierra=document.getElementById('ButtonEarth')
   botones =document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque(){
  botones.forEach((boton)=>{
    boton.addEventListener('click',(e)=>{
         if (e.target.textContent==='🔥') {
            ataqueJugador.push('FUEGO')
            console.log(ataqueJugador)
            boton.style.background='#112f58'
            boton.disabled=true
         } else if(e.target.textContent==='💧') {
            ataqueJugador.push('AGUA')
            console.log(ataqueJugador)
            boton.style.background='#112f58'
            boton.disabled=true
         }else{
            ataqueJugador.push('TIERRA')
            console.log(ataqueJugador)
            boton.style.background='#112f58'
            boton.disabled=true
         }
        ataqueAleatorioEnemigo()
    })
  })
}

function selectPetEnemy(){
    let mascotaAleatorio=aleatorio(0,mokepones.length-1)
    spamPetEnemy.innerHTML=mokepones[mascotaAleatorio].nombre
    AataquesMokeponesEnemigo= mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatoreo=aleatorio(0,AataquesMokeponesEnemigo.length-1)
    if(ataqueAleatoreo==0 || ataqueAleatoreo==1){
        ataqueEnemigo.push('FUEGO')
    }else if (ataqueAleatoreo==3||ataqueAleatoreo==4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length===5) {
        combate()
    }
}

function indesAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador=ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index]===ataqueEnemigo[index]) {
            indesAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        }else if (ataqueJugador[index]==='FUEGO' && ataqueEnemigo[index]==='TIERRA'){
            indesAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            vidaJugador.innerHTML=victoriasJugador
        }else if (ataqueJugador[index]==='AGUA' && ataqueEnemigo[index]==='FUEGO'){
            indesAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            vidaJugador.innerHTML=victoriasJugador
       
        }else if (ataqueJugador[index]==='TIERRA' && ataqueEnemigo[index]==='AGUA'){
            indesAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            vidaJugador.innerHTML=victoriasJugador
            
        }else{
            indesAmbosOponentes(index,index)
            crearMensaje("PERDIO")
            victoriasEnemigo++
            vidaEnemigo.innerHTML=victoriasEnemigo 
        }
        
    }

    revisarvidas()
}

function revisarvidas(){
    if(victoriasJugador=== victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("GANASTE LA BATALLA")
    }else{
        crearMensajeFinal("Lo siento perdiste :C")
    }
}

function crearMensaje(resultado){
    let nuevoataquejugador=document.createElement('p')
    let nuevoataqueenemigo=document.createElement('p')

    seccionMensajes.innerHTML=resultado
    nuevoataquejugador.innerHTML=indexAtaqueJugador
    nuevoataqueenemigo.innerHTML=indexAtaqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML='Tu mascota ataco con' +ataqueJugador+', la mascota del enemigo ataco con '+ataqueEnemigo+' - '+resultado
    
    ataquejugador.appendChild(nuevoataquejugador)
    ataqueenemigo.appendChild(nuevoataqueenemigo)
}
function crearMensajeFinal(resultadofinal){
    seccionMensajes.innerHTML=resultadofinal

    seccionReiniciar.style.display='block'
}

function reiciarJuego(){
    location.reload()
}

function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
function pintarCanvas() {
    mascotaJugadorObj.x=mascotaJugadorObj.x+mascotaJugadorObj.velocidadx
    mascotaJugadorObj.y=mascotaJugadorObj.y+mascotaJugadorObj.velocidady
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        mascotaJugadorObj.mapaFoto,
        mascotaJugadorObj.x,
        mascotaJugadorObj.y,
        mascotaJugadorObj.ancho,
        mascotaJugadorObj.alto
    )
}
function Arriba() {
    mascotaJugadorObj.velocidady=-5
}
function Abajo() {
    mascotaJugadorObj.velocidady=5
}
function Izquierda() {
    mascotaJugadorObj.velocidadx=-5
}
function Derecha() {
    mascotaJugadorObj.velocidadx=5
}
function deternerMovimiento() {
    mascotaJugadorObj.velocidadx=0
    mascotaJugadorObj.velocidady=0
}

function PresionaUnaTecla (event) {
   switch (event.key) {
    case 'ArrowUp':
        Arriba()
        break;
    case 'ArrowDown':
        Abajo()
        break;
    case 'ArrowLeft':
        Izquierda()
        break;
    case 'ArrowRight':
        Derecha()
        break; 
    default:
        break;
   } 
}

function iniciarMapa() {
    mapa.width=800
    mapa.height=600
    mascotaJugadorObj=obtenerObjetoMAscota(mascotaJugador)
    //console.log(mascotaJugadorObj,mascotaJugador)
    intervalo=setInterval(pintarCanvas,100)
    window.addEventListener('keydown',PresionaUnaTecla)
    window.addEventListener('keyup',deternerMovimiento) 
}

function obtenerObjetoMAscota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador==mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }     
}
window.addEventListener('load',iniciarJuego)