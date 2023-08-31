const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagPlayPause = document.querySelector('#start-pause img')
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somZero = new Audio('/sons/beep.mp3')
const somInicia = new Audio('/sons/play.wav')
const somPausa = new Audio('/sons/pause.mp3')

musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somZero.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos--
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    
    if(intervaloId){
        imagPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        somPausa.play()
        zerar()
        iniciarOuPausarBt.textContent = 'Começar'
    }

    mostrarTempo()
    botoes.forEach((target) => {
        target.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
<strong class="app__title-strong">mergulhe no que importa.</strong>

            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
    Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
    `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
    Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
    `
        default:
            break;
    }
}

function iniciarOuPausar(){
    if(intervaloId){
        imagPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        somPausa.play()
        zerar()
        iniciarOuPausarBt.textContent = 'Começar'
        return
    }
    imagPlayPause.setAttribute('src', '/imagens/pause.png')
    somInicia.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
