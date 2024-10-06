'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "5a984efc5ab0a57b8b40cbe88b6f8468",
"assets/AssetManifest.bin.json": "d853f5009d7bd91cd4d54087ef699c48",
"assets/AssetManifest.json": "4aba201ddcf48424879558a19c62f5ee",
"assets/assets/carousel_image1.jpg": "ca45d26d689de0b336a59194ddff8352",
"assets/assets/carousel_image2.jpg": "a1a20cfd0e63a6b757efcf268bbba06f",
"assets/assets/carousel_image3.jpg": "c53244335c5abc83c5bcbceda07850af",
"assets/assets/carousel_image4.jpg": "ca45d26d689de0b336a59194ddff8352",
"assets/assets/carousel_image5.jpg": "7920aadb60f8ed344e282b8cc1c94c3e",
"assets/assets/detail_image1.jpg": "320a4e040a31a7ce5fcaa3731e780996",
"assets/assets/detail_image2.jpg": "76052470dcedb65abe1299dfa77560b0",
"assets/assets/profile_pic.png": "34e43db57fa630e3bb4ef344c36ab9e7",
"assets/assets/sdg1.png": "8ed13545b9f7fa9126457b6ea2e93a79",
"assets/assets/sdg10.png": "3e808035fa689076e17fce4f9630232a",
"assets/assets/sdg11.png": "1e73e087766f2312af0902735e413991",
"assets/assets/sdg12.png": "f4b0c01bad06f788d35e52af942e8330",
"assets/assets/sdg13.png": "c34cb6e9fd44f1dcb60b4357fc1139a8",
"assets/assets/sdg14.png": "a0672360ffb86d2badacbbb41cabe692",
"assets/assets/sdg15.png": "c8ffd4b1e822bd61a9963c0ced82963a",
"assets/assets/sdg16.png": "3a088f1149aec9cb09fd4154d4c78c58",
"assets/assets/sdg17.png": "2a3d5f7c49dd26765a027009749cf3d2",
"assets/assets/sdg2.png": "4f8f68e65668c6126d5ba1c03a5d84d7",
"assets/assets/sdg3.png": "e132a87958650af56864c6e9eb7e4549",
"assets/assets/sdg4.png": "d2a173c2b6ff1f21b9c08abb64ad5b70",
"assets/assets/sdg5.png": "41ddc499c68bef28df21bcb660cde3dd",
"assets/assets/sdg6.png": "fd1df07fe39971e2a4dbb68f18d2d51b",
"assets/assets/sdg7.png": "3b1e2d053b3e5d57af65bd6147bfe62b",
"assets/assets/sdg8.png": "175d0417dcaa11d14a943b83f7515786",
"assets/assets/sdg9.png": "dda8cf40d9f0f6ad83219b12e112959f",
"assets/assets/sdg_wheel.png": "58b3039e1abaf55e21d33ac96daeb936",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "c0ed9a199c946c1b5182655cfc931493",
"assets/NOTICES": "5a56aa1d3a2b09bc3c8b5bf009100689",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "8b417c75cf9d2b283ec0c66b1b677edb",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9ed97ae55a1e3bac65ef4586ac50a169",
"/": "9ed97ae55a1e3bac65ef4586ac50a169",
"main.dart.js": "bd91d1f99bc13732fc87625f4afdb4f2",
"manifest.json": "6f5626ec9be53e9d5e1a3b4495137999",
"version.json": "59a0f12d2bfabbf089974635f9606695"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
