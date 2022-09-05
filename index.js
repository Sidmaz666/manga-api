const express = require('express') 
const cors = require('cors')

const func = require('./functions/main.js')

const server = express()

server.use(cors())


const port = process.env.PORT || 3020 

server.get('/', (req,res) => {
   const page = req.query.page || 1
   func.popular(res,page)
})


server.get('/recent', (req,res) => {
   const page = req.query.page || 1
   func.recent(res,page)
})

server.get('/search', (req,res) => {
   const page = req.query.page || 1
   const key = req.query.key
   func.search(res,page,key)
})

server.get('/category', (req,res) => {
   func.all_category(res)
})

server.get('/category/:genre', (req,res) => {
   const genre = req.params.genre
   func.category(res,genre)
})

server.get('/list', (req,res) => {
  const charc = req.query.q || ''
  const page = req.query.page || 1
  func.sortAlphaNumeric(res,charc,page)
})

server.get('/chapter/:id', (req,res) => {
	const id = req.params.id 
  	func.get_chapters(res,id)
})

server.get('/view/:chapter_id', (req,res) => {
  	const id = req.params.chapter_id
  	func.get_manga(res,id)
})

server.get('/uri/:link', (req,res) => {
  	const url = req.params.link
  	func.convetURL2URI(res,url)
})

server.get('/thumb/:link', (req,res) => {
  	const url = req.params.link
  	func.get_thumb(res,url)
})

server.listen(port, 
  () => {
    console.log(`http://localhost:${port}`)
  })

module.exports = server
