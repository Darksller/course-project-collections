## Env configuration:
1. client-side .env file required fields
   - firebase secret configuration data:
      * VITE_STORAGE_BUCKET.
      * VITE_APPID
      * VITE_PROJECT_ID
      * VITE_AUTH_DOMAIN
      * VITE_API_KEY
      * VITE_STORAGE_SERVER_URL
      * VITE_MESSAGING_SENDER_ID
   - VITE_API_URL - url address to the server side

2. server-side .env file required fields:
   * AUTH_COOKIE - key name for cookies 
   * DOMAIN - site domain
   * MONGO_URL - url to mongodb server
   * PORT - server port
   * REFRESH_SECRET - secret key for refreshToken
   * REFRESH_TOKEN_EXPIRATION - refreshToken expiretion time
   * SECRET - secret key for salt
   * TOKEN_EXPIRATION - accessToken expiretion time
