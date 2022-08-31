let ataqueJugador
let ataqueEnemigo

function iniciarJuego (){
    let botonSelecionarMascota = document.getElementById('Buttonselect')
    botonSelecionarMascota.addEventListener('click',selecionarMascota)

    let botonFuego=document.getElementById('ButtonFire') 
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua=document.getElementById('ButtonWater') 
    botonAgua.addEventListener('click',ataqueAgua)
    let botonTierra=document.getElementById('ButtonEarth') 
    botonTierra.addEventListener('click',ataqueTierra)
}

function selecionarMascota(){
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

    if(ataqueJugador==ataqueEnemigo){
        crearMensaje("EMPATE")
    }else if (ataqueJugador=='FUEGO' && ataqueEnemigo=='TIERRA'){
        crearMensaje("GANASTE")
       
    }else if (ataqueJugador=='AGUA' && ataqueEnemigo=='FUEGO'){
        crearMensaje("GANASTE")
   
    }else if (ataqueJugador=='TIERRA' && ataqueEnemigo=='AGUA'){
        crearMensaje("GANASTE")
        
    }else{
        crearMensaje("PERDIO")
       
    }
    
}

function crearMensaje(resultado){
    let seccionMensajes=document.getElementById('mensaje')
    let parrafo = document.createElement('p')
    parrafo.innerHTML='Tu mascota ataco con' +ataqueJugador+', la mascota del enemigo ataco con '+ataqueEnemigo+' - '+resultado
    seccionMensajes.appendChild(parrafo)
}

function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}


window.addEventListener('load',iniciarJuego)