/**
 *
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @since 10-06-2017
 * @version 1.0.0
 *
 *	Archivo de control del servidor de NodeJS
 * 
 */

/*
	Importación de librerías
 */
var express 	= require('express');
var request 	= require('request');
var http 		= require('http');
var mysql   	= require('mysql');
var dateFormat 	= require('dateformat');
var path    	= require("path");

/*
	Instancia de Express
 */
var app = express();
app.use(express.static(__dirname + '/public'));

/*
	Definición del servidor
 */
http.createServer(app).listen(8080);

/*
	Conexión a la BD y definición de tablas
 */

var tablas = {
	indicador 	: 	'indicador'
};

var connection = mysql.createConnection({
  
  host     		: 	'127.0.0.1',
  user    		: 	'chipax',
  password		: 	'chipax',
  database		: 	'chipax',
  port			: 	8889

});

connection.connect( function (err) {
  
  if (err) {
    console.error('Error al conectar la BD: ' + err.stack);
    return;
  }

});


/*
	Servicios
 */
app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.get('/setindicadores', function (req, res) { /* Indicadores */
	
	request('http://mindicador.cl/api', function (err, ret, html){

		if (!err) {

			var indicadores = JSON.parse(html);
			
			setIndicador(indicadores.dolar);
			setIndicador(indicadores.dolar_intercambio);
			setIndicador(indicadores.euro);
			setIndicador(indicadores.imacec);
			setIndicador(indicadores.ipc);
			setIndicador(indicadores.ivp);
			setIndicador(indicadores.libra_cobre);
			setIndicador(indicadores.tasa_desempleo);
			setIndicador(indicadores.tpm);
			setIndicador(indicadores.uf);
			setIndicador(indicadores.utm);

			res.send(JSON.stringify({
				estado	: 	true,
				mensaje	: 	'Indicadores cargados'
			}));

		} else {
			res.send(err);
		};

	});

});

app.get('/getindicadores', function (req, res) {

	var hoy 	= dateFormat(new Date (), "yyyy-mm-dd HH:MM:ss");
	var query 	= 'SELECT * FROM ' + tablas.indicador;
	var insert 	= connection.query (query, function (error, results, fields) {
		
		res.send(JSON.stringify(results));

	});

});


/*
	Inserción en la tabla de indicadores.

	@param Object oIndicador : {
		indicador 	: 	nombre del indicador,
		nombre		: 	texto de título
		fecha		: 	fecha de la toma (yyyy-mm-dd hh:mm:ss),
		valor		: 	valor
	}

 */
function setIndicador (oIndicador) {

	/*
		Objeto a insertar
	 */
	var oInsert = {
		indicador 		: 	oIndicador.codigo,
		nombre			: 	oIndicador.nombre,
		fecha			: 	dateFormat(oIndicador.fecha, "yyyy-mm-dd HH:MM:ss"),
		valor 			:	oIndicador.valor,
		unidad_medida 	: 	oIndicador.unidad_medida
	};

	/*
		Verificación de existencia del registro
	 */
	var query = "SELECT COUNT(*) AS num FROM " + tablas.indicador + 
				" WHERE indicador = '" + oInsert.indicador + "' " +
				" AND fecha = '" + oInsert.fecha + "' ";

	var num = connection.query (query, function (error, results, fields) {
		
		if (parseInt(results[0].num) == 0) { // Si no existe

			/*
				Inserción del registro
			 */
			var query 	= 'INSERT INTO ' + tablas.indicador + ' SET ? ';
			var insert 	= connection.query (query, oInsert, function (error, results, fields) {
				if (error) throw error;
			});

		}

	});

}	

/*
	Rescate de valores desde la BD
 */
function getIndicadores () {

}
