prerender-precache
===========================

prerender-precache is based of a [fork](https://github.com/vasilevich/prerender/tree/custom) I made of this amazing project :
[prerender](https://github.com/prerender/prerender)
I forked it in order to add the ability to "precache" sitemaps/individual urls so that I could automate it in my build
process.    
Please note that this project uses in-memory cache, it caches the content forever([max js number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)) until precache or clear cache routes
are called.    
feel free to modify the cache-manager module with redis or other cache-manager modules. and make a pull-request.    
how to use?    
clone this project open default.json or production.json edit the port/unix path and chromeLocation to the path of your chrome install   
and start with:   
`npm run start`    
it should work exactly like [prerender](https://github.com/prerender/prerender) so please read their documentation,  
However with 2 additional routes:

## preCache route(automatically clears cache of requested urls)

### Precache a sitemap:

`http://localhost:9022/preCache?sitemap=https://www.google.com/sitemap.xml`

### Precache urls:

`http://localhost:9022/preCache?urls=https://www.google.com&urls=https://github.com&urls=https://test.com`

### Precache a single url:

`http://localhost:9022/preCache?url=https://www.google.com`

## clear cache route

same query params like above but with clearCache, eg:    
`http://localhost:9022/clearCache?url=https://www.google.com`    
without params will clear all the cache:
`http://localhost:9022/clearCache`

## Credits

[prerender](https://github.com/prerender/prerender) - I forked their project

Enjoy!
