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

	$.ajax({

	  url: 'http://localhost:8080/indicadores',
	  method: 'GET'

	}).done(function(data) {

		console.debug(data);
	  
		for (data_i=0; data_i<data.length; data_i++) {

			var _html = '<tr>' +
							'<td>' +
								'<input type="checkbox" id="chk_'+data[data_i].id+'" value="'+data[data_i].id+'" onclick="setLocalStorage();" />' +
							'</td>' +
							'<td>' +
								data[data_i].id +
							'</td>' +
							'<td>' +
								data[data_i].title +
							'</td>' +
						'</tr>';

			$("table#tabla tbody").append(_html);

		}

		/*
			Checcked by local storage
		 */
		check();


	});

});