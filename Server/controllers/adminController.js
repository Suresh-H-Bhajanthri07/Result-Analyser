const AdminModel = require('../models/adminModel');
const Course = require('../models/courseModel');
const Student = require('../models/studentModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.createCourse = async (req, res, next) => {
  try {
    const { courseName, courseId, semester, credits } = req.body;

    if (!courseId || !courseName || !semester || !credits) {
      return res.status(500).json({ msg: 'All fields are compulsory' });
    }

    const course = await Course.create(req.body);

    res.status(200).json({ msg: 'Course created sucessfully', course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'All fields are compulsory' });
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const { name, usn, semester, email, division } = req.body;

    if (!name || !usn || !semester || !email || !division) {
      return res.status(500).json({ msg: 'All fields are compulsory' });
    }

    const student = await Student.create(req.body);

    res.status(200).json({ msg: 'Student created sucessfully', student });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

function getRandomName() {
  const firstNames = [
    'Amith',
    'Vinay',
    'Harish',
    'Samarth',
    'Sohan',
    'Kartik',
    'Sushanth',
    'Shashank',
    'Satish',
    'Sudeep',
    'Pratik',
    'Sumith',
    'Sakshi',
    'Meghana',
    'Sreeleela',
    'Swathi',
    'Sanjana',
    'Anushka',
    'Aishwarya',
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];

  return randomFirstName;
}

// Example usage

const usedNumbers = [];

function getRandomTwoDigitNumber() {
  let randomNum;

  do {
    randomNum = Math.floor(Math.random() * 90) + 10;
  } while (usedNumbers.includes(randomNum));

  usedNumbers.push(randomNum);

  // Reset usedNumbers array if all two-digit numbers have been used
  if (usedNumbers.length === 90) {
    usedNumbers.length = 0;
  }

  return randomNum;
}

// Example usage
for (let i = 0; i < 20; i++) {
  const randomTwoDigitNumber = getRandomTwoDigitNumber();
  console.log(randomTwoDigitNumber);
}

// Example usage

const func = (index) => {
  const name = getRandomName();
  const division = 'C';
  const semester = '5';
  const usn = '01fe21bci0' + index;
  const email = `${usn}@${'kletech.ac.in'}`;

  return { name, usn, semester, email, division };
};

func();

exports.createStudents = async (req, res, next) => {
  try {
    const students = [];
    console.log('I am On');
    for (let index = 40; index < 65; index++) {
      const student = func(index);
      const student1 = await Student.create(student);
      students.push(student);
    }
    res.status(200).json({ msg: 'Students created sucessfully', students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const { semester } = req.body;
    console.log(semester, '----------');
    const courses = await Course.find({ semester: semester });
    console.log(courses);
    res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'error in fetching' });
  }
};

const fifthsem = [
  '656af187ee0c5210faaa6bd4',
  '656af1e6ee0c5210faaa6bd6',
  '656af202ee0c5210faaa6bd8',
  '656af21cee0c5210faaa6bda',
  '656af235ee0c5210faaa6bdc',
  '656af25cee0c5210faaa6bde',
];
const thirdsem = [
  '656af2d0ee0c5210faaa6be2',
  '656af311ee0c5210faaa6be4',
  '656af32fee0c5210faaa6be6',
  '656b012a4335863402cdc7dd',
];

exports.addCourse = async (req, res, next) => {
  try {
    const students = await Student.find();

    students.map(async (s) => {
      if (s.semester == '5') {
        for (let i = 0; i < 6; i++) {
          s.course.push(fifthsem[i]);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          s.course.push(thirdsem[i]);
        }
      }
      await s.save();
    });
    res.status(200).json({ msg: 'added Sucessfully!' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: error.message });
  }
};

//  ! Actual functionalities

exports.getSingleMarks = async (req, res, next) => {
  try {
    const { usn, courseid } = req.body;
    const student = await Student.findOne({ usn });
    if (!student) {
      res.status(400).json({ msg: 'No student with such usn' });
    }

    const course = await Course.findOne({ courseId: courseid });
    let marks;
    let flag = false;
    for (let i = 0; i < student.marks.length; i++) {
      if (student.marks[i].course.toString() == course._id.toString()) {
        marks = student.marks[i];
        flag = true;
        break;
      }
    }
    if(flag == true) {
      res.status(200).json(marks);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

exports.getMarksForChart = async (req, res, next) => {
  try {
    const { courseId, division, semester } = req.body;
    const students = await Student.find({ semester, division });
    const course = await Course.findOne({ courseId });
    console.log(course);
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

exports.getMarks = async (req, res, next) => {
  try {
    let marks;
    const { usn, courseid } = req.body;
    const student = await Student.findOne({ usn: usn });
    const course = await Course.findOne({ courseId: courseid });
    console.log(course, 'course');

    for (let i = 0; i < student.marks.length; i++) {
      console.log(student.marks[i].course);
      if (student.marks[i].course.toString() == course._id.toString()) {
        console.log('found');
        marks = student.marks[i];
      }
    }
    res.status(200).json(marks);
  } catch (error) {
    console.log(error);
    res.status(200).json({ msg: error.message });
  }
};

exports.marksEntry = async (req, res, next) => {
  try {
    const { usn, exam, courseid, marks } = req.body;
    console.log('marks entry start...............');
    console.log(req.body);

    const student = await Student.findOne({ usn: usn });
    console.log('student', student);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const course = await Course.findOne({ courseId: courseid });

    let foundObject = false;
    for (let i = 0; i < student.marks.length; i++) {
      console.log(i, '-------->', student.marks[i].course, course._id);
      if (student.marks[i].course.toString() == course._id.toString()) {
        foundObject = true;
        if (exam === 'isa1') {
          student.marks[i].isa1 = marks;
        } else if (exam === 'isa2') {
          student.marks[i].isa2 = marks;
        } else if (exam === 'esa') {
          student.marks[i].esa = marks;
        }
        await student.save();
        return res.status(200).json({
          msg: `marks of ${exam} of student is updated successfully`,
          student,
        });
      }
    }

    if (exam === 'isa1') {
      student.marks.push({ course: course._id, isa1: marks });
    } else if (exam === 'isa2') {
      student.marks.push({ course: course._id, isa2: marks });
    } else if (exam === 'esa') {
      student.marks.push({ course: course._id, esa: marks });
    }
    mark = student.marks;
    await student.save();
    res.status(200).json({
      msg: `marks of ${exam} of student is updated successfully`,
      student,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const { semester, division } = req.body;
    const students = await Student.find({ semester, division });
    res.status(200).json({ len: students.length, students });
    console.log(students);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};
exports.getStudent = async (req, res, next) => {
  try {
    const { usn } = req.body;
    console.log(usn);
    const student = await Student.findOne({ usn: usn });
    console.log(student);
    res.status(200).json({ student });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(404).json({ msg: 'All fields are compulsory' });
    }

    const admin = await AdminModel.findOne({ email: email });
    console.log(admin);

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    if (!(await admin.matchPassword(password))) {
      return res.status(404).json({ msg: 'Invalid credentials' });
    }

    const token = admin.authToken();
    const cookieOptions = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ msg: 'Login Sucessfull', token });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};

const sendMail = async (email, token) => {
  const transoprter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maidurtarun@gmail.com',
      pass: 'kdczevrrligrwoag',
    },
  });

  const mailOptions = {
    from: 'kletech.ac.in',
    to: email,
    subject: 'Regarding Password reset',
    text: `please click the following link to reset your password : http://localhost:5173/reset/${token}`,
  };

  transoprter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error in sending the mail', err);
      return false;
    } else {
      console.log('Mail Sent sucessfully', info);
      return true;
    }
  });
};

exports.resetPasswordMail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ msg: 'All fields are compulsory' });
    }

    const admin = await AdminModel.findOne({ email: email });
    console.log(admin);

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const token = admin.generateResetToken();

    console.log(token);

    if (!(await sendMail(email, token))) {
      return res.status(404).json({ msg: 'Error in sending mail' });
    }

    res.status(200).json({ msg: 'Password Reset Mail Sent Sucessfully' });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(404).json({ msg: 'Token not found' });
    }

    console.log(token);
    const decodedtoken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    const admin = await AdminModel.findOne({ resetToken: decodedtoken });
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(404).json({ msg: 'All fields are compulsory' });
    }

    if (!(newPassword === confirmPassword)) {
      return res
        .status(404)
        .json({ msg: 'Password and Confirm Password are not same' });
    }

    admin.password = newPassword;
    admin.resetToken = undefined;
    await admin.save();
    return res.status(200).json({ msg: 'Password reset successfully' });
  } catch (e) {
    // admin.resetToken = undefined;
    // await admin.save();
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const admin = await AdminModel.create({ name, email, password });

    return res.status(200).json({ msg: 'Admin created successfully', admin });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Failed to create admin' });
  }
};

exports.getSemStudents = async (req, res, next) => {
  const sem = req.params.sem;
  try {
    const students = await Students.find({ semester: sem });

    const adiv = students.filter((s) => s.division === 'A');
    const bdiv = students.filter((s) => s.division === 'B');
    const cdiv = students.filter((s) => s.division === 'C');

    res.status(200).json({ adiv, bdiv, cdiv });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Failed to create admin' });
  }
};
