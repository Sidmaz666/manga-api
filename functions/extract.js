import cheerio from 'cheerio'

async function extract_list(data,page){
  
  const $ = cheerio.load(data)
  let manga_list = []

  let total_pages = $('div.paginator').find('a.link').last().text().replace('\n','').trim()
 
  if(Number(total_pages) < 1 || page == null){
    total_pages = "1"
    page == null ? page = 1 : page = page
  }


  $('div.section-body > div.list > div.book-item > div.book-detailed-item')
    .each(async function(){
	const title = $(this).find('div.title').find('a').attr('title')

	const id = $(this).find('div.title').find('a').attr('href').replace('/','')


	let views = $(this).find('div.views').find('span').text().replace('&nbsp;','').trim()


      if(views.length < 1){
	views = '0'
      }

	const rating = $(this).find('div.rating').text().trim()

	let category = []

      	 $(this).find('div.genres').find('span').each(function(){
		const genres = $(this).attr('class')
	   	category.push(
			genres
	   	)
      	})

      category = category.toString()

      if(category.length < 1){
	category = "Not Mentioned"
      }

	let description = $(this).find('div.summary').find('p').text().trim().replaceAll('\n',' ').replaceAll('\"',' ').replaceAll('\\',' ').trim()

      if(description.length < 8){
	description = "Not Available"
      }

      let thumb_id = $(this).find('div.thumb').find('img').attr('data-src').replace('https://thumb.youmadcdn.xyz/file/img-mbuddy/thumb/','')


      manga_list.push({
	id,
	title,
	views,
	thumb_id,
	rating,
	category,
	description
      })

  })

  if(manga_list.length == 0){
    manga_list.push({
      message : "No Result Found!"
    })
  }

  return {
      page : page,
      total_pages,
      list : manga_list
  } 

}

async function extract_category(data){
  
  const $ = cheerio.load(data)
  const list = []

  $('ul.genre-list > li').each(function(){
	const genre = $(this).find('a').attr('title')
	const genre_id = $(this).find('a').attr('href').replace('/genres/','')

    list.push({
      genre_id,
      genre
    })
  })

  return {
    list
  }
}

async function extract_category_list(data){
      const list = await extract_list(data,null)
      return list
}

async function extract_chapter(data){
    const $ = cheerio.load(data)
  
    const list = []

  $('ul.chapter-list > li').each(function(){
    const chapter_title = $(this).find('a').attr('title')
    const chapter_id = $(this).find('a').attr('href')
    			.replaceAll("/",'_')
 
    list.push({
      chapter_id,
      chapter_title
    })

  })

  return {
    list
  }

}

async function extract_manga(data_0,data_1,chapter_id){
  
  let  $ = cheerio.load(data_0)

  const title = $('div.detail').find('div.name').find('h1').text().trim()

  const alt_title = $('div.detail').find('div.name').find('h2').text().trim()

  const total_chapters = Number($('div.detail').find('p').last().prev().text().replace('Chapters:','').trim())

  const authors = $('div.detail').find('p').first().text().replace(/[\n\r\s]/g,'').trim().replace('Authors:','')

  const _status = $('div.detail').find('p').first().next().text().replace(/[\n\r\s]/g,'').trim().replace('Status:','')


  let category = []
  $('div.detail').find('p').first().next().next().find('a').each(function(){
	const genre = $(this).text().replace(/[\n\r\s]/g,'').trim().toLowerCase()
    	category.push(genre)
  })

  category = category.toString()


  const last_updated = $('div.detail').find('p').last().text().replace('Last update:','').trim()

  const rating = $('div.rating').text().trim().replace(/[\n\r\s]/g,'')

  const description = $('div.summary > div.section-body').find('p').next().text().trim().replace(/[\n]/g,'').replace('SHOW MORE','').trim()

  const thumb_id = $('div.book-info > div#cover').find('div.img-cover')
    			.find('img').attr('data-src')
    			.replace('https://thumb.youmadcdn.xyz/file/img-mbuddy/thumb/','')

  $ = cheerio.load(data_1)

  const image_id = $('div#pf-sticky').next().next().text().replace('var chapImages = ','').replace(/\'/g,'').replaceAll('/','__').trim().split(',')

  return {
    chapter_id,
    total_chapters,
    title,
    alt_title,
    authors,
    _status,
    category,
    last_updated,
    rating,
    description,
    thumb_id,
    image_id
  }

}



export {
  extract_list,
  extract_category,
  extract_category_list,
  extract_chapter,
  extract_manga,
}
