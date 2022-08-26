# manga-api
A Simple API to get latest Available Manga.

<img src="./assets/manga-api-logo.png" style="width:100%;padding:0.75rem" alt="MANGA-API-Banner">

## Endpoints

1. `/` - `Get List of Popular Mangas`
2. `/recent` - `Get List of Recent Updated & Launche Manga`
3. `/search` - `Search manga, /search?key=query`
4. `/category` - `Get List of Available Categories`
5. `/category/category_name` - `Get Manga List Based on Category`
6. `/list` - `Get All Available Manga`
7. `/chapter/manga_id` - `Get List of Chapters`
8. `/view/chapter_id` - `Get Manga Details ALong with Image ID`
9. `/uri/image_id` - `Get Image URI`

## Query Parameters

1. `?page=` - `Available on /,/recent,/list endpoints`
2. `?q=` - `Available on /list endpoint, Sort by Number/Letters`
3. `?key=` - `Available on /search endpoint, Search Manga based on keyword`

