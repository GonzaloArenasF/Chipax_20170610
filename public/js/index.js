/**
 *
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @since 10-06-2017
 * @version 1.0.0
 *
 *	Archivo de funciones JS
 * 
 */

$(document).ready(function () {

	getIndicadores();

	$("a#btn_act_dat").click(function() {
		getIndicadores();
	});

});


function getIndicadores () {

	$("table#tabla tbody").empty();

	$.ajax({

	  url: 'http://localhost:8080/getindicadores',
	  method: 'GET'

	}).done(function(data) {
	  
		data = eval(data);

		for (data_i=0; data_i<data.length; data_i++) {
			
			if (data[data_i].unidad_medida  == 'Porcentaje') data[data_i].unidad_medida = '%';
			var fecha = new Date(data[data_i].fecha);

			var _html = '<tr>' +
							'<td>' + data[data_i].nombre + '</td>' +
							'<td>' + data[data_i].valor + ' ' + data[data_i].unidad_medida + '</td>' +
							'<td>' + fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear() + '</td>' +
						'</tr>';

			$("table#tabla tbody").append(_html);

		}

	});

}