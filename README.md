## NodeJS + Bootstrap CSS + Sass + jQuery + MySQL

Esta aplicación es mi primer trabajo utilizando NodeJS. Su operación principal es consultar indicadores económicos desde un servicio REST. Posteriormente estos datos se guardan en una base de datos MySQL cuya tabla de destino debe cumplir la siguiente estructura:

CREATE TABLE indicador (
  id bigint(20) unsigned NOT NULL PRIMARY KEY AUTOINCREMENT,
  indicador varchar(100) NOT NULL,
  nombre varchar(250) NOT NULL,
  fecha datetime NOT NULL,
  valor float NOT NULL,
  unidad_medida varchar(100) NOT NULL
); 

Todos los rescates y publicaciones se realizaron con NodeJS, mietras que el despliegue está controlado por Bootstrap CSS, Sass y jQuery.

Adicionalmente, se incorporó Gulp para relizar la compialción de SASS a CSS, minificación y ofuscación.

La instalación se realizó usando NPM y Bower con los siguientes comandos en el directorio del proyecto:
- npm init
- bower init
- npm install gulp
- npm install gulp-cli -save
- npm install gulp-sass --save
- bower install bootstrap-sass --save
- bower install jquery --save
- npm install mysql -g
- npm install dateformat —save


## Official Documentation

- [NPM website](https://www.npmjs.com/).
- [Bower website](https://bower.io/).
- [NodeJS website](https://nodejs.org/es/).
- [Bootstrap CSS website](http://getbootstrap.com/css/).
- [SASS website](http://sass-lang.com/).
- [GULP website](http://gulpjs.com/).
- [jQuery website](https://jquery.com/).

### License

Bajo licencia MIT - [MIT license](http://opensource.org/licenses/MIT)
