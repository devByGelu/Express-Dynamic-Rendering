module.exports = class database {
  currStudent
  adminLoggedIn
  admin
  students
  courses
  constructor() {
    this.currStudent = { index: -1 }
    this.adminLoggedIn = false
    this.admin = { username: 'admin123', password: '123' }
    this.courses = [
      { name: 'CSCC13', id: 4 },
      { name: 'CSCC12', id: 39 },
    ]
    this.students = [
      { id: 2, name: 'Angelu Garcia', password: 'angelux', courses: [4,39] },
      { id: 3, name: 'Ferdi Garcia', password: 'angelux', courses: [39] },
    ]
  }

  getCoursesWithStudents() {
    let result = []
    this.courses.forEach((course) => {
      let coursemates = []
      this.students.forEach((student) => {
        let studcourses = student.courses
        if (studcourses.some((studcourse) => studcourse == course.id))
          coursemates.push(student.name)
      })
      result.push({coursename: course.name, coursemates: coursemates})
    })
    return result
  }

  //  Returns enrolled courses of the student logged in
  getCourses() {
    // Convert ID to Name
    let courseIDs = []
    courseIDs = this.students[this.currStudent.index].courses //get course ids of the student
    const courseNames = courseIDs.map(
      (cID) => this.courses.find((course) => course.id == cID).name // MAP course ids to its corresponding names
    )
    return courseNames
  }

  enrollCourse(cID) {
    this.students[this.currStudent.index].courses.push(cID)
  }

  getValidCourses() {
    let courseIDs = []
    this.courses.forEach((c) => {
      let currStudentCourses = this.students[this.currStudent.index].courses
      if (!currStudentCourses.some((course) => c.id == course)) {
        courseIDs.push(c)
      }
    })
    return courseIDs
  }

  validAdmin(username, password) {
    let flag =
      this.admin.username === username && this.admin.password === password
    this.adminLoggedIn = flag
    console.log('admin logged in: ', this.adminLoggedIn)
    return this.adminLoggedIn
  }

  validStudent(id, pw) {
    let flag = false
    let studId = this.students.findIndex(
      (stud) => stud.id == id && stud.password == pw
    )
    if (studId != -1) {
      this.currStudent.index = studId
      return true
    }
    return false
  }
  addCourse(name) {
    var randomnumber = Math.floor(Math.random() * (1000 - 50 + 1)) + 50

    if (!this.courses.some((course) => course.name == name)) {
      this.courses.push({ name: name, id: randomnumber })
    }
    console.log(this.courses)
  }
}
