const axios = require('axios')
const cookie = require('cookie')
const Cryptr = require('cryptr')
const { AuthorizationCode } = require('simple-oauth2')

const authorizationCode = new AuthorizationCode({
  auth: {
    authorizePath: process.env.AUTHORIZE_PATH,
    tokenHost: process.env.TOKEN_HOST,
    tokenPath: process.env.TOKEN_PATH
  },
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  }
})

const cryptr = new Cryptr(process.env.CRYPTR)

exports.handler = async event => {
  try {
    const command = event.queryStringParameters.command || ''
    const cookies = cookie.parse(event.headers.cookie)
    if (!cookies.token) {
      return {
        body: 'Unauthorized',
        statusCode: 401
      }
    }
    let accessToken = authorizationCode.createToken(
      JSON.parse(cryptr.decrypt(cookies.token))
    )
    if (accessToken.expired(300)) {
      accessToken = await accessToken.refresh()
    }
    switch (command) {
      case 'account': {
        const response = await axios.get('/api/account', {
          baseURL: process.env.BASE_URL,
          headers: { Authorization: `Bearer ${accessToken.token.access_token}` }
        })
        return {
          body:
            (response.status === 200 && JSON.stringify(response.data)) || '',
          statusCode: response.status
        }
      }
      case 'playing': {
        const response = await axios.get('/api/account/playing', {
          baseURL: process.env.BASE_URL,
          headers: { Authorization: `Bearer ${accessToken.token.access_token}` }
        })
        return {
          body:
            (response.status === 200 && JSON.stringify(response.data)) || '',
          statusCode: response.status
        }
      }
      case 'token': {
        // BREAKS PROXY PARADIGM, required to stream board from Lichess
        return {
          body: JSON.stringify({
            baseURL: process.env.BASE_URL,
            headers: {
              Authorization: `Bearer ${accessToken.token.access_token}`
            }
          }),
          statusCode: 200
        }
      }
    }
    return {
      body: 'BadRequest',
      statusCode: 400
    }
  } catch (error) {
    return {
      body: error.toString(),
      statusCode: 500
    }
  }
}
