var defaultEnvs = ['development', 'production']

function Env() {
  return this.init()
}

Env.prototype = {

  init: function() {
    this.setEnvs(defaultEnvs)

    if (process.env.BROCCOLI_ENV) {
      this.setEnv(process.env.BROCCOLI_ENV)
    }

    return this
  },

  getEnv: function () {
    return this.env
  },

  setEnv: function(env) {
    if (this.envs.indexOf(env) === -1) {
      this.env = this.envs[0]
    }
    else {
      this.env = env
    }

    return this
  },

  getEnvs: function() {
    return this.envs
  },

  setEnvs: function(envs) {
    if (!Array.isArray(envs)) {
      throw new Error('Parameter "envs" should be an array')
    }

    this.envs = envs

    this.setEnv(this.env)

    return this
  }

}

module.exports = (function() {
  return new Env()
})()
