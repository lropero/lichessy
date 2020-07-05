const fs = require('fs')

fs.writeFileSync(
  './.env',
  Object.keys(process.env).reduce((env, environmentVariable) => {
    env = `${env}${environmentVariable}=${process.env[environmentVariable]}\n`
    return env
  }, '')
)

const stats = fs.statSync('./.env')
console.log(`.env file created: ${stats.size} bytes`)
