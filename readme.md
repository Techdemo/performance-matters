# Performance matters

## De doelen van dit vak:
- in aanraking komen met optimalisaites die kunnen worden uitegevoerd op een web app.
- Uitleg over hoe de optimalisatie technieken precies werken.
- Wat zijn service workers en hoe werken deze.
- Wat voor invloed hebben optimalisaties op dingen zoals bv de first meaningful paints.
- Hoe werkt caching en hoe implementeer je dit op je website.

## optimalisaties
Voor het uitvoeren van de optimalisaties heb ik een gulpfile opgezet. De gulpfile voert de optimalisatie scripts uit in tasks.

Hieronder staan beschreven welke optimalisaties ik heb uitgevoerd op de site.
### -Minify css
Voor het compressen van mijn css gebruik ik cssnano en gulp clean css.
####- cssnano
cssnano is een minifier en past de markup van mijn css aan. Verwijderd voornamelijk whitespaces om ruimte te besparen. De semantiek blijft hetzelfde.
####- cleancss
clean css voert nog wat verdere optimalisaties uit zoals het verwijderen van css wat niet gebruikt wordt. Waarom ik cleancss nog in de gulpfile is het geplaatst omdat cleancss ook een aantal optimalisaties in mijn css uitvoert. Het is mgelijk om cleancss verder te customizen door zelf properties te declareren. Clean css zou dan ook kunnen uitvoeren wat css kan.
### -Minify JS
Gulp minify js taks voert de gulp tasks uit voor mijn client side js. Ik heb niet zoveel client side js in mijn bestand. Dus het effect van minify js heb ik minimaal kunnen testen. Hiervoor gebruik ik uglify. Uglify is een compressor en minifier.
### -Service Worker
Voor het cachen van mijn bestanden maak ik gebruik van een simpele service worker. Ik vond service workers vrij complex om te begrijpen maar toen ik er eenmaal mee aan de slag ging, begon het kwartje te vallen. Voor het implementeren van een service worker heb ik gebruik gemaakt van deze guide op [Google](https://developers.google.com/web/fundamentals/primers/service-workers/)

Een service worker is een script wat wordt gedraaid op de achtergrond. De functies worden aangeroepen met behulp van een SW file wat wordt geregistreerd in de browser. Het sw bestand 'slaapt' als het ware op de achtergrond totdat er een trigger wordt gegeven voor activatie. Denk aan dingen zoals het uitzenden van een push notificatie in de browser. Ik gebruik de api het om een http requests te ondervangen en hiermee caching in te schakelen.

```
 if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').then(function (registration) {
              // Registration was successful
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
              // registration failed :(
              console.log('ServiceWorker registration failed: ', err);
            });
          });
        }
```

Een footnote:
Wat ik nog moet implementeren is een soort file revisioning systeem waarmee de service worker kan bekijken of er bv een nieuw css bestand wordt aangeleverd dan de gene die al gecached is.
### -Gzip compression
Gzip compression is een express middleware wat je kan implementeren in je app.
```
const compression = require('compression');

app.use(compression())
```
Eigenlijk heel simpel om te implementeren.
Gzip verkleint de responses op de response body en versnelt daarmee het ophalen van je pagina.

### -Caching
Wat ik al eerder benoemde is dat ik caching met een SW heb geimplementeerd.

```
self.addEventListener('install', function (event) {
  //perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
```
in de bovenstaande code, installeert de service worker zichzelf wanneer er wordt gezien door de SW dat er nog geen caching actief is. Wanneer de SW zichzelf heeft geinstalleerd wordt caching aangedraaid.

```
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
```
Wanneer je vervolgens weer opnieuw op de site komt dan wordt de sw wakker en worden de bestanden uit de caching opgehaald. Alleen bestanden en urls die je aangeeft in een variabele worden hierin betrokken.

## Het effect van de optimalisaties
In mijn client js stond bijna niks. Dus in file size zul je het verschil daarin niet zien. Waar ik de optimalisaties wel in in terug zag was de compression, service workers en het verkleinen van mijn css. De testen heb ik uitgevoerd op een hele trage internetverbinding, in te stellen via de google developer tools.

### CSS
Before:
![alt text](https://raw.githubusercontent.com/Techdemo/performance-matters/master/assets/without%20css%20compression.png)

after:
![alt text](https://raw.githubusercontent.com/Techdemo/performance-matters/master/assets/with%20css%20compression.png)

### compression
Before:
![alt text](https://raw.githubusercontent.com/Techdemo/performance-matters/master/assets/without%20compression.png)

after:
![alt text](https://raw.githubusercontent.com/Techdemo/performance-matters/master/assets/with%20compression.png)
