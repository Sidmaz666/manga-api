const axios = require('axios')

const extract = require('./extract.js')

const base_url = "https://mangabuddy.com/"
const axios_header = {
	headers : {
	'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'referer': 'https://mangabuddy.com/',
	}
} 

async function popular(res,page){
  try{
  const req = await axios(`${base_url}popular?page=${page}`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_list(data,page)

  res.status(200).json({
    data: list
  })

  } catch(err){
    console.log(err)
  }

}

async function recent(res,page){
try{
  const req = await axios(`${base_url}latest?page=${page}`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_list(data,page)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}

async function search(res,page,key){
try{
  const req = await axios(`${base_url}search?q=${key}&page=${page}`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_list(data,page)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}

async function all_category(res){
try{
  const req = await axios(`${base_url}genres`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_category(data)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}


async function category(res,category){
try{
  const req = await axios(`${base_url}genres/${category}`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_category_list(data)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}


async function sortAlphaNumeric(res,charc,page){
try{
  const req = await axios(`${base_url}az-list/${charc}?page=${page}`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_list(data,page)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}

async function get_chapters(res,id){
try{
  const req = await axios(`${base_url}api/manga/${id}/chapters?source=detail`,axios_header)
  const data = await req.data
  
  const list = await extract.extract_chapter(data)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}

async function convetURL2URI(res,url){
try{
  const main_url = 'https://s1.mbcdnv1.xyz/file/img-mbuddy/manga/' + url.replaceAll('__','/')

  const req = await axios(main_url,{
	headers : {
        'authority': 's1.mbcdnv1.xyz',
	'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'sec-gpc': 1,
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-dest': 'image',
        'referer': 'https://mangabuddy.com/',
        'accept-language': 'en-US,en;q=0.9',
        'dnt': 1
	},
	responseType : 'arraybuffer'
	})

      const pre_data = await req.data
      const buffer = Buffer.from(pre_data).toString('base64');
      const data = `data:${req.headers["content-type"]};base64,${buffer}`

      res.status(200).json({image_uri:data})
  } catch(err){
    console.log(err)
  }

}

async function get_manga(res,chapter_id){
try{	
  const manga_id = chapter_id.replace(/_chapte.*/g,'').replace('_','')
    		   .replace(/_vol.*/g,'')

  const chapter = chapter_id.replaceAll('_','/').replace('/','')

  const req = await axios.all([
    axios.get(
    `${base_url}${manga_id}`, axios_header
  ),
    axios.get(
    `${base_url}${chapter}` , axios_header
  )
  ])

  const data = {
  	req_1 : await req[0].data,
  	req_2 : await req[1].data,
  }

  const manga_ = await extract.extract_manga(
    data.req_1,
    data.req_2,
    chapter_id
  )

  res.status(200).json({data :manga_})
  } catch(err){
    console.log(err)
  }

}

async function get_thumb(res,id){
  try{
    const req = await axios("https://thumb.youmadcdn.xyz/file/img-mbuddy/thumb/" + id,{
	headers : {
        'authority': 'thumb.youmadcdn.xyz',
	'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'sec-gpc': 1,
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-dest': 'image',
        'referer': 'https://mangabuddy.com/',
        'accept-language': 'en-US,en;q=0.9',
        'dnt': 1
	},
	responseType : 'arraybuffer'
	})

      const pre_data = await req.data
      const buffer = Buffer.from(pre_data).toString('base64');
      const data = `data:${req.headers["content-type"]};base64,${buffer}`

      res.status(200).json({
	image_uri : data
      })
  } catch(err){
    console.log(err)
  }

}


module.exports = {
  popular,
  recent,
  all_category,
  search,
  category,
  sortAlphaNumeric,
  get_chapters,
  get_manga,
  convetURL2URI,
  get_thumb
}
