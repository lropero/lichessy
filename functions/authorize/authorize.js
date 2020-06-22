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

exports.handler = async event => {
  try {
    const token = await authorizationCode.getToken({
      code: event.queryStringParameters.code,
      redirect_uri: process.env.REDIRECT_URI
    })
    return {
      body: '',
      headers: {
        'Cache-Control': 'no-cache',
        Location: `${event.queryStringParameters.state}#${Buffer.from(
          JSON.stringify(token)
        ).toString('base64')}`
      },
      statusCode: 302
    }
  } catch (error) {
    return {
      body: error.toString(),
      statusCode: 500
    }
  }
}
