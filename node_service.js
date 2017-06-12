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

/*
	Instancia de Express
 */
var app = express();

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
app.get('/indicadores', function (req, res) { /* Indicadores */
	
	request('http://mindicador.cl/api', function (err, ret, html){

		if (!err) {

			var indicadores = JSON.parse(html);
			
			guardarValorIndicador(indicadores.dolar);
			guardarValorIndicador(indicadores.dolar_intercambio);
			guardarValorIndicador(indicadores.euro);
			guardarValorIndicador(indicadores.imacec);
			guardarValorIndicador(indicadores.ipc);
			guardarValorIndicador(indicadores.ivp);
			guardarValorIndicador(indicadores.libra_cobre);
			guardarValorIndicador(indicadores.tasa_desempleo);
			guardarValorIndicador(indicadores.tpm);
			guardarValorIndicador(indicadores.uf);
			guardarValorIndicador(indicadores.utm);

			res.send(JSON.stringify({
				estado	: 	true,
				mensaje	: 	'Indicadores cargados'
			}));

		} else {
			res.send(err);
		};

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
function guardarValorIndicador (oIndicador) {

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
