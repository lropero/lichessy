const fs = require('fs')

const environmentVariables = [
  'AUTHORIZE_PATH',
  'BASE_URL',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'CRYPTR',
  'REDIRECT_URI',
  'REDIRECT',
  'SCOPES',
  'TOKEN_HOST',
  'TOKEN_PATH'
]

fs.writeFileSync(
  './.env',
  environmentVariables.reduce((env, environmentVariable) => {
    if (process.env[environmentVariable]) {
      env = `${env}${environmentVariable}=${process.env[environmentVariable]}\n`
    }
    return env
  }, '')
)

const stats = fs.statSync('./.env')
console.log(`.env file created: ${stats.size} bytes`)
