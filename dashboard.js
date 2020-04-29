firebase.initializeApp({
    apiKey: "AIzaSyBINgwt6we4IUMYtioFuuHTkP69LEuE6ic",
    authDomain: "cityuapp-8ca32.firebaseapp.com",
    databaseURL: "https://cityuapp-8ca32.firebaseio.com",
});
var users = firebase.database().ref();


function user(edad, idUsuario, genero) {
    this.edad = edad;
    this.genero = genero;
    this.idUsuario = idUsuario;
    this.numeroCompras = 0;
    this.gastoTotal = 0;


}



function restaurante( idRestaurante, nombre, categoria, calificacion,  tiempoEspera) {
    this.idRestaurante = idRestaurante;
    this.nombre = nombre;
    this.categoria = categoria;
    this.calificacion = calificacion;
    this.tiempoEspera = tiempoEspera;
    this.numeroPedidos = 0;
    this.gasto = 0;
    this.pedidos =  {};


}


function pedidos(edad, idUsuario, fecha, hora, genero, restaurante, promocion, tiempoEspera, categoria, producto) {
    this.edad = edad;
    this.genero = sexo;
    this.idUsuario = idUsuario;
    this.frecuencia = frecuencia;
    this.hora = hora;
    this.restaurante = restaurante;
    this.promocion = promocion;
    this.tiempoEspera= tiempoEspera;
    this.categoria= categoria
    this.producto = producto
}
function categoria(nombre) {

    this.nombre = nombre;
    this.numeroRestaurante = 1;
    this.numeroCompras = 0;
    this.gastoTotal = 0;


}

function promocion( idPromocion, fecha, restaurante, producto, tipoPromocion, categoria) {
   this.fecha = fecha;
    this.restaurante = restaurante;
    this.idpromocion = idpromocion;
    this.producto = producto;
    this.categoria= categoria;
    this.tipoPromocion = tipoPromocion;
}

function restaurante( idRestaurante, nombre, categoria, calificacion,  tiempoEspera) {
    this.idRestaurante = idRestaurante;
    this.nombre = nombre;
    this.categoria = categoria;
    this.calificacion = calificacion;
    this.tiempoEspera = tiempoEspera;
    this.numeroPedidos = 0
    this.pedidos =  {};


}

var promociones = {};
var productos = {};
var restaurantesLogs = {};
var usuarios = {};
var pedidosLogs = {};
var edadLogs = {};
var categoriasLogs = {};


function datosEdad(edad, mujer, hombre) {
    this.edad = edad;
    this.numeroMujeres = mujer;
    this.numeroHombres = hombre;
    this.numeroCompras= 0;
    this.gasto = 0;
    this.calificaciones = 0;
    this.numeroTotal = 0;



}

function datosEdad(edad, mujer, hombre) {
    this.edad = edad;
    this.numeroMujeres = mujer;
    this.numeroHombres = hombre;
    this.numeroCompras= 0;
    this.gasto = 0;
    this.calificaciones = 0;
    this.numeroTotal = 0;
    this.numeroCompras = 0;



}

function cargar() {

    for (i = 0; i < 120; i++)
    {

        var log = new datosEdad(i,0,0)

        edadLogs[i] = log;

    }

    users.on('value', function(snapshot) {

        let objKey = Object.keys(snapshot.val());
        let objval = Object.values(snapshot.val())


        let productos= objval[1];

        let restaurantes= objval[2];

        cargarRestaurante(restaurantes );
        let promociones= objval[3];

        let usuarios= objval[4];
        console.log(usuarios)
        cargarUsuario(usuarios);



    });


}



function cargarRestaurante(restaurantes) {
    var key= Object.keys(restaurantes)
    for(r in restaurantes){
        var val = restaurantes[r];
        var idRestaurante = r
        var calificacion = parseInt(val.calificacion)
        var nombre = val.nombre
        var categoria1 = val.categoria
        var tiempoEspera = parseInt(val.tiempoEspera)


        var nuevo =  new restaurante( idRestaurante, nombre, categoria1, calificacion,  tiempoEspera)

        restaurantesLogs[idRestaurante]= nuevo

        if (categoriasLogs[categoria1] === undefined){
            categoriasLogs[categoria1] = new categoria(categoria1)

        }
        else{
            categoriasLogs[categoria1].numeroRestaurante = categoriasLogs[categoria1].numeroRestaurante + 1;

        }


    }

}

function cargarUsuario(usuarios) {
    var key= Object.keys(usuarios)
    for(r in usuarios){
        var val = usuarios[r];
        var idUsuario = r
        var genero = val.perfil.genero
        var edad = parseInt(val.perfil.edad)
        var pedidos = val.pedidos





        if(edad !== undefined) {
            var nuevo =  new user(edad, idUsuario, genero)
            usuarios[idUsuario] = nuevo
            var t = edadLogs[edad]
            edadLogs[edad].numeroTotal = edadLogs[edad].numeroTotal + 1
            if (genero === "m") {

                edadLogs[edad].numeroHombres = edadLogs[edad].numeroHombres + 1

            } else {
                edadLogs[edad].numeroMujeres = edadLogs[edad].numeroMujeres + 1
            }

        }
        if (pedidos === undefined) {

        }
        else {
            for(y in pedidos){
                var idPedido = y;
                var valPedido = pedidos[y];
                var categoria = valPedido.categoria
                var restaurante = valPedido.restaurante
                var gasto = parseInt(valPedido.valor)
                categoriasLogs[categoria].numeroCompras = categoriasLogs[categoria].numeroCompras+1
                categoriasLogs[categoria].gastoTotal = categoriasLogs[categoria].gastoTotal+gasto

                restaurantesLogs[restaurante].numeroPedidos = restaurantesLogs[restaurante].numeroPedidos +1
                var p = restaurantesLogs[restaurante].gasto
                if(p === undefined) {
                    restaurantesLogs[restaurante].gasto=  gasto
                }
                else {
                    restaurantesLogs[restaurante].gasto =restaurantesLogs[restaurante].gasto + gasto
                }

                edadLogs[edad].numeroCompras = edadLogs[edad].numeroCompras +1
                edadLogs[edad].gasto = edadLogs[edad].gasto + gasto


            }
        }




    }
}

function datosEdad(edad, mujer, hombre) {
    this.edad = edad;
    this.numeroMujeres = mujer;
    this.numeroHombres = hombre;
    this.numeroCompras= 0;
    this.gasto = 0;
    this.calificaciones = 0;
    this.numeroTotal = 0;
    this.numeroCompras = 0;



}

function visitasCategoria(){


    tabla1 = []
    grafica1 = []



    for(d in restaurantesLogs)
    {




        log = {
            "nombre": restaurantesLogs[d].nombre,
            "categoria": restaurantesLogs[d].categoria,
            "numero_pedidos": restaurantesLogs[d].numeroPedidos,
            "gasto": parseInt(restaurantesLogs[d].gasto)
        };

        tabla1.push(log)


    }

    for(h in categoriasLogs){
        y = [categoriasLogs[h].nombre,categoriasLogs[h].numeroCompras]
        grafica1.push(y)

    }

    console.log("paso")


    var pivot = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: tabla1
            },
            "slice": {
                "rows": [

                     {
                        "uniqueName": "categoria"
                    }
                ],
                "columns": [
                    {
                        "uniqueName": "Measures"
                    }
                ],
                "measures": [
                    {
                        "uniqueName": "numero_pedidos",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de pedidos"
                    },
                    {
                        "uniqueName": "nombre",
                        "aggregation": "count",
                        "format": "currency",
                        "grandTotalCaption": "Numero de Restaurantes"
                    },
                    {
                        "uniqueName": "gasto",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Ingresos"
                    }]


            }
        }
    });



    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Número de compras por categoria'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de compras por categoria'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Número de compras '
        },
        series: [{
            name: 'Número de compras por categori',
            data: grafica1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}


function visitasPorEdad(){


    tabla1 = []
    grafica1 = []



    for(d in edadLogs)
    {

        y = [d,parseInt(edadLogs[d].numeroCompras)]
        grafica1.push(y)

        console.log(restaurantesLogs[d])
        log = {
            "edad": edadLogs[d].edad,
            "numero_total": edadLogs[d].numeroTotal,
            "numero_mujeres": edadLogs[d].numeroMujeres,
            "numero_hombres": edadLogs[d].numeroHombres,
            "numero_pedidos": edadLogs[d].numeroCompras,
            "gasto": parseInt(edadLogs[d].gasto)
        };

        tabla1.push(log)






    }

    console.log("paso")


    var pivot = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: tabla1
            },
            "slice": {
                "rows": [

                    {
                        "uniqueName": "edad"
                    }
                ],
                "columns": [
                    {
                        "uniqueName": "Measures"
                    }
                ],
                "measures": [
                    {
                        "uniqueName": "numero_pedidos",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de pedidos"
                    },
                    {
                        "uniqueName": "gasto",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Gasto"
                    },{
                        "uniqueName": "numero_total",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de clientes"
                    },{
                        "uniqueName": "numero_mujeres",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de mujeres"
                    },{
                        "uniqueName": "numero_hombres",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de hombres"
                    }]


            }
        }
    });



    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Numero de compras promedio por edad'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text:  'Numero de compras promedio por edad'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Numero de compras'
        },
        series: [{
            name:  'Numero de compras promedio por edad',
            data: grafica1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}


function gastoPorEdad(){


    tabla1 = []
    grafica1 = []



    for(d in edadLogs)
    {

        y = [d,parseInt(edadLogs[d].gasto)]
        grafica1.push(y)

        console.log(restaurantesLogs[d])
        log = {
            "edad": edadLogs[d].edad,
            "numero_total": edadLogs[d].numeroTotal,
            "numero_mujeres": edadLogs[d].numeroMujeres,
            "numero_hombres": edadLogs[d].numeroHombres,
            "numero_pedidos": edadLogs[d].numeroCompras,
            "gasto": parseInt(edadLogs[d].gasto)
        };

        tabla1.push(log)






    }

    console.log("paso")


    var pivot = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: tabla1
            },
            "slice": {
                "rows": [

                    {
                        "uniqueName": "edad"
                    }
                ],
                "columns": [
                    {
                        "uniqueName": "Measures"
                    }
                ],
                "measures": [
                    {
                        "uniqueName": "numero_pedidos",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de pedidos"
                    },
                    {
                        "uniqueName": "gasto",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Gasto"
                    },{
                        "uniqueName": "numero_total",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de clientes"
                    },{
                        "uniqueName": "numero_mujeres",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de mujeres"
                    },{
                        "uniqueName": "numero_hombres",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de hombres"
                    }]


            }
        }
    });



    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gasto promedio por edad'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text:  'Gasto promedio por edad'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Gasto'
        },
        series: [{
            name:  'Gasto promedio por edad',
            data: grafica1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}






function establecimientosMasVisitados(){


    tabla1 = []
    grafica1 = []



    for(d in restaurantesLogs)
    {

            y = [restaurantesLogs[d].nombre,restaurantesLogs[d].numeroPedidos]
            grafica1.push(y)

console.log(restaurantesLogs[d])
        log = {
            "nombre": restaurantesLogs[d].nombre,
            "categoria": restaurantesLogs[d].categoria,
            "numero_pedidos": restaurantesLogs[d].numeroPedidos,
            "gasto": parseInt(restaurantesLogs[d].gasto)
        };

        tabla1.push(log)






    }

    console.log("paso")


    var pivot = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: tabla1
            },
            "slice": {
                "rows": [

                    {
                        "uniqueName": "nombre"
                    }, {
                        "uniqueName": "categoria"
                    }
                ],
                "columns": [
                    {
                        "uniqueName": "Measures"
                    }
                ],
                "measures": [
                    {
                        "uniqueName": "numero_pedidos",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de pedidos"
                    },
                    {
                        "uniqueName": "gasto",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Ingresos"
                    }]


            }
        }
    });



    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Número de compras por establecimiento'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de compras por establecimiento'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Número de compras '
        },
        series: [{
            name: 'Número de compras por establecimiento',
            data: grafica1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}

function establecimientosconMasIngresos(){


    tabla1 = []
    grafica1 = []



    for(d in restaurantesLogs)
    {

        y = [restaurantesLogs[d].nombre,parseInt(restaurantesLogs[d].gasto)]
        grafica1.push(y)

        console.log(restaurantesLogs[d])
        log = {
            "nombre": restaurantesLogs[d].nombre,
            "categoria": restaurantesLogs[d].categoria,
            "numero_pedidos": restaurantesLogs[d].numeroPedidos,
            "gasto": parseInt(restaurantesLogs[d].gasto)
        };

        tabla1.push(log)






    }

    console.log("paso")


    var pivot = new WebDataRocks({
        container: "#wdr-component",
        toolbar: false,
        report: {
            dataSource: {
                data: tabla1
            },
            "slice": {
                "rows": [

                    {
                        "uniqueName": "nombre"
                    }, {
                        "uniqueName": "categoria"
                    }
                ],
                "columns": [
                    {
                        "uniqueName": "Measures"
                    }
                ],
                "measures": [
                    {
                        "uniqueName": "numero_pedidos",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Numero de pedidos"
                    },
                    {
                        "uniqueName": "gasto",
                        "aggregation": "average",
                        "format": "currency",
                        "grandTotalCaption": "Ingresos"
                    }]


            }
        }
    });



    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Ingresos por establecimiento'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ingresos por establecimiento en pesos'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Ingresos'
        },
        series: [{
            name: 'Ingresos por establecimiento',
            data: grafica1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}

