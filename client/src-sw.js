const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

// register route that sw will manage
registerRoute(
  // check destination of request
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // instance of 'asset-cache'
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // Plugin used to see which responses are allowed to be cached
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);