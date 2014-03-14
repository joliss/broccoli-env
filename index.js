exports.getEnv = getEnv
function getEnv () {
  var env = process.env.BROCCOLI_ENV || 'development'
  if (env !== 'production' && env !== 'development' && env !== 'test') {
    throw new Error('Environment set to "' + env + '", but only BROCCOLI_ENV=production and BROCCOLI_ENV=development and BROCCOLI_ENV=test are supported at the moment')
  }
  return env
}
