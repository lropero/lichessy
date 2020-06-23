// const { AuthorizationCode } = require('simple-oauth2')
// const axios = require('axios')
const cookie = require('cookie')
// const Cryptr = require('cryptr')

// const authorizationCode = new AuthorizationCode({
//   auth: {
//     authorizePath: process.env.AUTHORIZE_PATH,
//     tokenHost: process.env.TOKEN_HOST,
//     tokenPath: process.env.TOKEN_PATH
//   },
//   client: {
//     id: process.env.CLIENT_ID,
//     secret: process.env.CLIENT_SECRET
//   }
// })

// const cryptr = new Cryptr(process.env.CRYPTR)

exports.handler = async event => {
  try {
    const command = event.queryStringParameters.command || ''
    const cookies = cookie.parse(event.headers.cookie)
    // switch (command) {
    //   case 'playing': {
    //     const response = await axios.get('/api/account/playing', {
    //       baseURL: process.env.BASE_URL,
    //       headers: { Authorization: `Bearer ${token.access_token}` }
    //     })
    //     return response.status === 200 && response.data
    //   }
    // }
    return {
      body: JSON.stringify({ command, cookies }),
      statusCode: 200
    }
  } catch (error) {
    return {
      body: error.toString(),
      statusCode: 500
    }
  }
}
