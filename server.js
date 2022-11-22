
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const db = require("./db")

const { async } = require('@firebase/util')
const firestore = db.firestore()
const collection = "userdb"

app.use(express.urlencoded({ extended: false }))

 //



 
//view engin
app.set('view engine', 'ejs');    
app.set('views', __dirname + '/views');


//app
app.get('/',(req,res) =>{
  res.render('index')
})

app.post('/',(req,res) =>{
  res.render('index.ejs')
})


app.get('/login', (req, res) => {
    res.render('login')
  })
  
  
  app.post("/login", async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password
    }
  
    let checkUser = await firestore.collection(collection).where(
      "username",
      "==",
      data.username
    ).get()
  
    if(checkUser.empty){
      return res.render("error", {
        message: "User not found",
        link: "<a href='/login'>BACK TO LOGIN!!!</a>"
      })
    }
  
    let user = {}
    checkUser.forEach(doc => {
      const x = {
        username: doc.data().username,
        password: doc.data().password
      }
      user = x
    })
  
    if(data.password != user.password){
      return res.render("error", {
        message: "password is not correct, TRY AGAIN",
        link: "<a href='/login'>BACK TO LOGIN!!!</a>"
      })
    }
  
    return res.render("welcome", {
      username: data.username
    })
  })
  
  app.get('/register',  (req, res) => {
    res.render('register')
  })
  
  app.post('/register', async (req, res) => {
    let checkUser = await firestore.collection(collection).where(
      "username",
      "==",
      req.body.username
      ).get()
  
    if(!checkUser.empty){
      return res.render("error", {
        message: "USER ALREADY EXIT, YOU KNOWWWWW!!!!",
        link: "<a href='/register'>go back to register</a>"
      })
    }
  
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
  
    await firestore.collection(collection).doc().set(data)
    return res.render("success",{
      message: "register success leo dr",
      link: "<a href='/login'>Les`t go to LOGIN</a>"
    })
  })
    
    // try {
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //   users.push({
    //     id: Date.now().toString(),
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hashedPassword
    //   })
    //   res.redirect('/login')
    // } catch {
    //   res.redirect('/register')
    // }
 
  console.log(collection);


  app.listen(3000, () => console.log("app is running at http://localhost:3000"))