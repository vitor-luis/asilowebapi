const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.APP_PORT || 3000
const database = require('./src/config/database')

/*
    CONFIG bodyParser (CORS)
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const ContatoRoutes = require('./src/app/routes/contato')
const FaqRoutes = require('./src/app/routes/faq')
const HistoricoRoutes = require('./src/app/routes/historico')
const NoticiaRoutes = require('./src/app/routes/noticia')
const QuemSomosRoutes = require('./src/app/routes/quem_somos')
const TransparenciaRoutes = require('./src/app/routes/transparencia')
const UsuarioRoutes = require('./src/app/routes/usuario')

const handleAuthentication = require('./src/app/auth/authentication')
const handleAuthorization = require('./src/app/auth/authorization')
const forgot = require('./src/app/auth/forgot')

app.get('/', (req, res) => {
    res.send({ message: 'API backend node.js para o projeto do site institucional do asilo de Ibitinga' })
})

app.post('/login', handleAuthentication)

app.route('/esqueci-a-senha')
    .post(forgot.sendMailForgot)

app.route('/esqueci-a-senha/:token')
    .post(forgot.resetAndDefineNewPass)

app.use('/', handleAuthorization, ContatoRoutes)
app.use('/', handleAuthorization, FaqRoutes)
app.use('/', handleAuthorization, HistoricoRoutes)
app.use('/', handleAuthorization, NoticiaRoutes)
app.use('/', handleAuthorization, QuemSomosRoutes)
app.use('/', handleAuthorization, TransparenciaRoutes)
app.use('/', handleAuthorization, UsuarioRoutes)

app.use('*', (req, res) => res.send({ message: 'API não encontrada' }))

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`))

module.exports = app