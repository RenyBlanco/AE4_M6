
const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const { nextTick } = require('process');

// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
console.log(app.get('views'));

app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

// Middleware
app.use(morgan('dev'));

// Rutas
app.use(require('./routes'));
app.use('/paises', require('./routes/paises'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto : ',app.get('port'));
});
