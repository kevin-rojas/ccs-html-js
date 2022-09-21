let ataqueJugador
let ataqueEnemigo
let vidasJugador=3
let vidasEnemigo=3

function iniciarJuego (){
    let selecioneataque=document.getElementById('selecAttack')
    selecioneataque.style.display='none'
    let seccionReiniciar=document.getElementById('ButtonRestart')
    seccionReiniciar.style.display='none'

    let botonSelecionarMascota = document.getElementById('Buttonselect')
    botonSelecionarMascota.addEventListener('click',selecionarMascota) 
      


    let botonFuego=document.getElementById('ButtonFire') 
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua=document.getElementById('ButtonWater') 
    botonAgua.addEventListener('click',ataqueAgua)
    let botonTierra=document.getElementById('ButtonEarth') 
    botonTierra.addEventListener('click',ataqueTierra)

    let botonReniciar=document.getElementById('ButtonRestart')
    botonReniciar.addEventListener('click',reiciarJuego)
}

function selecionarMascota(){
    let selecionmascota=document.getElementById('selecPet')
    selecionmascota.style.display='none'
    let selecioneataque=document.getElementById('selecAttack')
    selecioneataque.style.display='flex'
    let inputfixer=document.getElementById('fixer')
    let inputborcho=document.getElementById('borcho')
    let inputterramon=document.getElementById('terramon')
    let SpamPetPlayer=document.getElementById('namePetPlayer')

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
    let vidaJugador=document.getElementById('lifePlayer')
    let vidaEnemigo = document.getElementById('lifeEnemy')

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
    let seccionMensajes=document.getElementById('resultado')
    let ataquejugador=document.getElementById('ataque-jugador')
    let ataqueenemigo=document.getElementById('ataque-enemigo')

    
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
    let seccionMensajes=document.getElementById('resultado')
    
    seccionMensajes.innerHTML=resultadofinal


    let botonFuego=document.getElementById('ButtonFire') 
    botonFuego.disabled=true
    let botonAgua=document.getElementById('ButtonWater') 
    botonAgua.disabled=true
    let botonTierra=document.getElementById('ButtonEarth') 
    botonTierra.disabled=true

    let seccionReiniciar=document.getElementById('ButtonRestart')
    seccionReiniciar.style.display='block'
}

function reiciarJuego(){
    location.reload()
}

function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego)