var arrImg = []
let img1 = new Imagen("1")
arrImg.push(img1)
let img2 = new Imagen("2")
arrImg.push(img2)
let img3 = new Imagen("3")
arrImg.push(img3)
let img4 = new Imagen("4")
arrImg.push(img4)
let img5 = new Imagen("5")
arrImg.push(img5)
let img6 = new Imagen("6")
arrImg.push(img6)
let img7 = new Imagen("7")
arrImg.push(img7)
let img8 = new Imagen("8")
arrImg.push(img8)

var fecha1;
var fecha2;
var timer;
var tiempo;
var tiempoSeg;
var tiempoMin;
var tiempoHrs;
var matches = []

$(document).ready(() => {
    //On click del boton Iniciar Partida
    $("#btnIniciar").click(function () { 
        fecha1 = (new Date()).getTime()

        //Se crean los arreglos para los números aleatorios y se usa sort()
        var indexRandom1 = [0, 1, 2, 3, 4, 5, 6, 7];
        indexRandom1 = indexRandom1.sort(() => Math.random() - 0.5);
        var indexRandom2 = [0, 1, 2, 3, 4, 5, 6, 7];
        indexRandom2 = indexRandom2.sort(() => Math.random() - 0.5);
        console.log(indexRandom1)
        console.log(indexRandom2)

        //Se obtiene la fecha actual y se muestra el contador de tiempo
        contador();
        $("#tiempo").show();

        $("#btnIniciar").hide()
        $("#btnReiniciar").show()
        $("table").addClass("tablaMostrada")
        $("table img").slideDown(1500);

        //Se el asigna un numero aleatorio al title de cada celda
        for (i = 0; i < 8; i++) {
            $("#img" + `${i + 1}`).attr("title", indexRandom1[i])
        }
        for (i = 0; i < 8; i++) {
            $("#img" + `${i + 9}`).attr("title", indexRandom2[i])
        }

        //Las cartas aparecen volteadas
        $("table img").attr("src", "./img/mario-hat.png")
    })
    n = 0;
    $("#puntos").html(`Puntos: ${n}pts.`)

    $("table img").click(function () {
        let x = this.title
        let z = $(this).attr("id")

        if (matches.includes(x))
            return false

        let y = $(this).attr("src")
        //Se desvanece y aparecer la imagen al darle click
        //Se realiza un fade out para aparecer la img con el title seleccionada
        if (y == "./img/mario-hat.png") {
            $(this).fadeOut(250, () => {
                $(this).attr("src", "./img/" + `${this.title}` + ".png")

                let ultimoTitle = sessionStorage.getItem("titles")
                let ultimoId = sessionStorage.getItem("id")
                //Si ultimoTitle está vacío significa que es el primer seleccionado, se guarda su title y el id de su celda
                if (ultimoTitle == undefined) {
                    sessionStorage.setItem("titles", x)
                    sessionStorage.setItem("id", z)
                    console.log(z)
                }
                else {
                    //Se comparan para saber si coinciden y se muestra el mensaje de acierto, se limpia el sessionStorage, 
                    //se aumentan los puntos y se añaden al arreglo matches
                    if (`${$(this).attr("title")}` == ultimoTitle) {
                        $("#acerto").fadeIn(1500).fadeOut(1500);
                        $("#fallo").fadeOut(250);
                        $("table img").removeClass("seleccionada");
                        sessionStorage.clear();
                        //Se aumenta el contador de pts solo al hacer match
                        n++;
                        $("#puntos").html(`Puntos: ${n}pts.`);
                        matches.push(x);
                        //Si matches tiene una longitud de 8, significa que se han hecho todos los matches posibles, por lo que se gana
                        //el juego
                        if (matches.length == 8){
                            fecha2 = (new Date()).getTime()
                            tiempo = fecha2 - fecha1
                            $("#gano").fadeIn(400)
                            $("#acerto").fadeOut(250);
                            //Se detiene el contador de tiempo
                            detenerContador();
                            //Se obtiene y setea (en caso de que no exista) el mejor tiempo y se compara cada tiempo hecho para
                            //determinar el mejor
                            var mejorTiempo = localStorage.getItem("tiempo")
                            if(mejorTiempo == undefined){
                                localStorage.setItem("tiempo", tiempo)
                            }else if (tiempo < mejorTiempo)
                                localStorage.setItem("tiempo", tiempo) 
                            if(mejorTiempo > 0){
                                let dias = tiempo/(60*1000*60*24)
                                let hrs = (dias - Math.floor(dias))*24
                                let min = (hrs - Math.floor(hrs))*60
                                let seg = (min - Math.floor(min))*60

                                $("#mejor").html(`<span><b>Mejor Tiempo:<br> 
                                ${Math.floor(hrs)}:${Math.floor(min)}:${Math.floor(seg)}</b></span>`)
                                $("#mejor").fadeIn(400);
                            }else
                            $("#mejor").html(`<span><b>Mejor Tiempo: </b></span>`)
                        }  
                        
                    }
                    else {
                        //Si falla, se voltean las dos cartas
                        $("#acerto").fadeOut(250);
                        $("#fallo").fadeIn(1500).fadeOut(1500);
                        $("table img").removeClass("seleccionada");
                        $(this).fadeOut(400, () => {
                            $(this).attr("src", "./img/mario-hat.png")
                            $("#" + `${ultimoId}`).attr("src", "./img/mario-hat.png")
                        }).fadeIn(400)
                        sessionStorage.clear();
                    }
                }
            }).fadeIn(250) 
        }
        $("table img").removeClass("seleccionada");
        $(this).addClass("seleccionada");
    })

    //Cuando se hace click en el btn Volver a Empezar se remueven las clases, se oculta lo agregado
    // y se reinician los valores, contadores y arreglos.
    $("#btnReiniciar").click(() => {
        detenerContador()
        n = 0;
        $("#btnIniciar").show()
        $("#btnReiniciar").hide()
        $("table").removeClass("tablaMostrada")

        matches = []

        $("#tiempo").hide();
        horas = 0;
        minutos = 0;
        segundos = 0;

        $("#acerto").hide();
        $("#fallo").hide();
        $("#gano").hide();

        $("table img").removeClass("seleccionada");
        $("table img").fadeOut(100).fadeIn(200).attr("src", "./img/mario-hat.png")
        $("#puntos").html("Puntos: 0pts.");
        $("#titulo").hide();
        $("#lista").empty();
    })
})

//Funcion de contador de tiempo
function contador() {
    let n = 0
    let x = 0
    let y = 0
    let z = 0

    timer = setInterval(()=>{
        z++;
        n++;
        //Se obtiene la hora, minuto y segundo actual para restarlo por si mismo y restablecerlo
        var fechaActual = new Date();
        var horas = fechaActual.getHours() - fechaActual.getHours() + y;
        var minutos = fechaActual.getMinutes() - fechaActual.getMinutes() + x;
        var segundos = fechaActual.getSeconds() - fechaActual.getSeconds() + n;
        
        //Cada 60 seg, aumenta el min
        if(segundos > 60){
            x++;
            n=0;
            var fechaActual = new Date();
            var horas = fechaActual.getHours() - fechaActual.getHours() + y;
            var minutos = fechaActual.getMinutes() - fechaActual.getMinutes() + x;
            var segundos = fechaActual.getSeconds() - fechaActual.getSeconds() + n;
        }

        //Cada 60 min, aumenta la hora
        if(minutos > 60){
            y++;
            x = 0;
            var fechaActual = new Date();
            var horas = fechaActual.getHours() - fechaActual.getHours() + y;
            var minutos = fechaActual.getMinutes() - fechaActual.getMinutes() + x;
            var segundos = fechaActual.getSeconds() - fechaActual.getSeconds() + n;
        }
        
        //Para mostrar el 00:00:00
        if (horas < 10) { horas = '0' + horas; }
        if (minutos < 10) { minutos = '0' + minutos; }
        if (segundos < 10) { segundos = '0' + segundos; }

        // tiempo = z;

        $("#tiempo").text(`${horas}:${minutos}:${segundos}`)
    },1000)
}

function detenerContador(){
    clearInterval(timer)
}

//Se crea la funcion constructora Imagen a la que se le pasará por parámetros el título de la imagen
function Imagen(title) {
    this.title = title
    this.contador = 0;
}




