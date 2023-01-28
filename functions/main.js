import * as BCFlare from "./bypass_cloudflare.js"
import fetch from 'node-fetch'
import * as extract from './extract.js'

const base_url = "https://mangabuddy.com/"

async function popular(res,page){
  try{
  const data = await BCFlare.get(`${base_url}popular?page=${page}`)
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
  const data = await BCFlare.get(`${base_url}latest?page=${page}`)
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
  const data = await BCFlare.get(`${base_url}search?q=${key}&page=${page}`)
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
  const data = await BCFlare.get(`${base_url}genres`)
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
  const data = await BCFlare.get(`${base_url}genres/${category}`)
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
  const data = await BCFlare.get(`${base_url}az-list/${charc}?page=${page}`)
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
  const data = await BCFlare.get(`${base_url}api/manga/${id}/chapters?source=detail`)
  const list = await extract.extract_chapter(data)

  res.status(200).json({
    data: list
  })
  } catch(err){
    console.log(err)
  }

}

async function get_manga(res,chapter_id){
try{	
  const manga_id = chapter_id.replace(/_chapte.*/g,'').replace('_','')
    		   .replace(/_vol.*/g,'')

  const chapter = chapter_id.replaceAll('_','/').replace('/','')

  const req_1 = await BCFlare.get(`${base_url}${manga_id}`)

  const req_2 = await BCFlare.get(`${base_url}${chapter}`)

  const data = {
  	req_1, 
  	req_2 
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

async function convetURL2URI(res,url){
try{
  const main_url = 'https://s1.mbbcdnv1.xyz/file/img-mbuddy/manga/' + url.replaceAll('__','/')

  const req = await fetch(main_url,{
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
	}
	})

      const pre_data = await req.arrayBuffer()
      const buffer = Buffer.from(pre_data).toString('base64');
      const data = `data:${req.headers["content-type"]};base64,${buffer}`

      res.status(200).json({image_uri:data})
  } catch(err){
    console.log(err)
  }

}

async function get_thumb(res,id){
  try{
    const req = await fetch(`https://thumb.youmadcdn.xyz/file/img-mbuddy/thumb/${id}`,{
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
	}
    })

      const pre_data = await req.arrayBuffer()
      const buffer = Buffer.from(pre_data).toString('base64');
      const data = `data:${req.headers["content-type"]};base64,${buffer}`

      res.status(200).json({
	image_uri : data
      })
  } catch(err){
    console.log(err)
  }

}


export {
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
