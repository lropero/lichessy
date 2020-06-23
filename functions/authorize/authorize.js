const { AuthorizationCode } = require('simple-oauth2')
const axios = require('axios')
const cookie = require('cookie')
const Cryptr = require('cryptr')

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

const baseURL = 'https://lichess.org/'

const cryptr = new Cryptr(process.env.CRYPTR)

exports.handler = async event => {
  try {
    const token = await authorizationCode.getToken({
      code: event.queryStringParameters.code,
      redirect_uri: process.env.REDIRECT_URI
    })
    const account = await axios.get('/api/account', {
      baseURL,
      headers: { Authorization: 'Bearer ' + token.access_token }
    })
    return {
      body: '',
      headers: {
        'Cache-Control': 'no-cache',
        Location: `${event.queryStringParameters.state}#${Buffer.from(
          JSON.stringify(account)
        ).toString('base64')}`
      },
      multiValueHeaders: [
        'Set-Cookie',
        cookie.serialize('token', cryptr.encrypt(JSON.stringify(token)), {
          httpOnly: true,
          sameSite: 'strict'
        })
      ],
      statusCode: 302
    }
  } catch (error) {
    return {
      body: error.toString(),
      statusCode: 500
    }
  }
}
