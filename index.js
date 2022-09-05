const express = require('express') 
const cors = require('cors')

const func = require('./functions/main.js')

const server = express()

server.use(cors())

const port = process.env.PORT || 3020 

server.get('/', async (req,res) => {
   const page = req.query.page || 1
   await func.popular(res,page)
})


server.get('/recent', async (req,res) => {
   const page = req.query.page || 1
   await func.recent(res,page)
})

server.get('/search', async (req,res) => {
   const page = req.query.page || 1
   const key = req.query.key
   await func.search(res,page,key)
})

server.get('/category', async (req,res) => {
   await func.all_category(res)
})

server.get('/category/:genre', async (req,res) => {
   const genre = req.params.genre
   await func.category(res,genre)
})

server.get('/list', async (req,res) => {
  const charc = req.query.q || ''
  const page = req.query.page || 1
  await func.sortAlphaNumeric(res,charc,page)
})

server.get('/chapter/:id', async (req,res) => {
	const id = req.params.id 
  	await func.get_chapters(res,id)
})

server.get('/view/:chapter_id', async (req,res) => {
  	const id = req.params.chapter_id
  	await func.get_manga(res,id)
})

server.get('/uri/:link', async (req,res) => {
  	const url = req.params.link
  	await func.convetURL2URI(res,url)
})

server.get('/thumb/:link', async (req,res) => {
  	const url = req.params.link
  	await func.get_thumb(res,url)
})

server.listen(port, 
  () => {
    console.log(`http://localhost:${port}`)
  })

module.exports = {
  server,
  func
}
