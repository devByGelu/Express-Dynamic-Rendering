const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

// Protecting admin route
router.use('', (req, res, next) => {
  let db = req.app.locals.db
  if (!db.adminLoggedIn) res.redirect('/')
  next()
})

router.get('/courses', (req, res) => {
  let db = req.app.locals.db
  console.log(db.getCoursesWithStudents())
  res.render('admincourses',{data: db.getCoursesWithStudents(),pageTitle: 'Admin', panel: 'Admin Panel', mode: 'view'})
})
router.get('/addcourse', (req, res) => {
  let db = req.app.locals.db
  res.render('addcourses', { students: db.students, courses: db.courses, pageTitle: 'Admin', panel: 'Admin Panel', mode: 'add' })
})
router.post('/addcourse', (req, res) => {
  let db = req.app.locals.db
  db.addCourse(req.body.newCourseName)
  res.redirect('/admin/addcourse')
})
// /admin/add-product => GET
/* router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});
 */
exports.routes = router
