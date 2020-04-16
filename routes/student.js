const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

// Protecting student route
router.use('', (req, res, next) => {
  let db = req.app.locals.db
  if (db.currStudent.index == -1) res.redirect('/')
  next()
})

router.get('/courses', (req, res) => {
  let db = req.app.locals.db
  res.render('studentcourses', { cnames: db.getCourses(),pageTitle: 'Student', panel: 'Student Panel', mode: 'view' })
})

router.get('/addcourse', (req, res) => {
  let db = req.app.locals.db
  res.render('enrollcourse', { courses: db.getValidCourses(),pageTitle: 'Student', panel: 'Student Panel', mode: 'add' })
})
router.post('/addcourse', (req, res) => {
  // console.log(req.body.data[0]) course name
  // console.log(req.body.data[1]) course id
  let db = req.app.locals.db
  db.enrollCourse(req.body.data[1])
  res.redirect('/student/addcourse')
})
exports.routes = router
