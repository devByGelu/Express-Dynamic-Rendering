const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

let database = require('./database')

app.locals.db = new database()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminData = require('./routes/admin')
const studentData = require('./routes/student')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use('/student', studentData.routes)


app.get('/', (req, res) => {
  let db = req.app.locals.db
  db.adminLoggedIn
    ? res.redirect('/admin/courses')
    : db.currStudent.index !== -1
    ? res.redirect('/student/courses')
    : res.render('loginPage')
})

app.post('/', (req, res) => {
  let db = req.app.locals.db

  db.validAdmin(req.body.uname, req.body.pword)
    ? res.redirect('/admin/courses') //  Success admin login
    : db.validStudent(req.body.uname, req.body.pword)
    ? res.redirect('/student/courses') //  Success student login
    : res.redirect('/')
})

app.get('/logout', (req, res) => {
  let db = req.app.locals.db

  db.adminLoggedIn = false
  db.currStudent.index = -1
  res.redirect('/')
})

/* app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
 */
app.listen(3000)
