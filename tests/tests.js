function unloadModule() {
  delete require.cache[require.resolve('../index.js')]
}

exports['Module Initialization'] = {
  'Without a BROCCOLI_ENV value': function(test){
    var defaultEnvList = ['development', 'production']
    var broccoliEnv = require('../index.js')

    test.deepEqual(
      defaultEnvList,
      broccoliEnv.getEnvs(),
      'Env list should be the default one.'
    )

    test.equal(
      defaultEnvList[0],
      broccoliEnv.getEnv(),
      'Env list should be the ' + defaultEnvList.join(',') + '.'
    )

    test.done()
  },
  'With a valid BROCCOLI_ENV value': function(test){
    var defaultEnvList = ['development', 'production']
    process.env.BROCCOLI_ENV = defaultEnvList[1]
    var broccoliEnv = require('../index.js')

    test.deepEqual(
      defaultEnvList,
      broccoliEnv.getEnvs(),
      'Env list should be the ' + defaultEnvList.join(',') + '.'
    )

    test.equal(
      process.env.BROCCOLI_ENV,
      broccoliEnv.getEnv(),
      'Env should be ' + process.env.BROCCOLI_ENV + '.'
    )

    test.done()
  },
  'With an invalid BROCCOLI_ENV value': function(test){
    var defaultEnvList = ['development', 'production']
    process.env.BROCCOLI_ENV = 'test'
    var broccoliEnv = require('../index.js')

    test.deepEqual(
      defaultEnvList,
      broccoliEnv.getEnvs(),
      'Env list should be the ' + defaultEnvList.join(',') + '.'
    )

    test.equal(
      defaultEnvList[0],
      broccoliEnv.getEnv(),
      'Env should be ' + defaultEnvList[0] + '.'
    )

    test.done()
  },
  tearDown: function(callback) {
    delete process.env.BROCCOLI_ENV
    unloadModule()
    callback()
  }
}

exports['Setting a custom environment list'] = {
  'With a valid env value': function(test){
    var envList = ['test', 'development', 'production']
    var broccoliEnv = require('../index.js')
    var oldEnv = broccoliEnv.getEnv()

    broccoliEnv.setEnvs(envList)

    test.deepEqual(
      envList,
      broccoliEnv.getEnvs(),
      'Env list should be ' + envList.join(',') + '.'
    )

    test.equal(
      oldEnv,
      broccoliEnv.getEnv(),
      'Env should be ' + oldEnv + '.'
    )

    test.done()
  },
  'With an invalid env value': function(test){
    var envList = ['test', 'staging', 'production']
    var broccoliEnv = require('../index.js')

    broccoliEnv.setEnvs(envList)

    test.deepEqual(
      envList,
      broccoliEnv.getEnvs(),
      'Env list should be ' + envList.join(',') + '.'
    )

    test.equal(
      envList[0],
      broccoliEnv.getEnv(),
      'Env should be ' + envList[0] + '.'
    )

    test.done()
  },
  'With an invalid env list value': function(test){
    var broccoliEnv = require('../index.js')
    var invalidEnvLists = ['foo', 1234, undefined, null, {}]

    invalidEnvLists.map(function(param) {
      test.throws(
        function() {
          broccoliEnv.setEnvs(param)
        },
        'Should throw an error.'
      )
    })

    test.throws(
      function() {
        broccoliEnv.setEnvs()
      },
      'Should throw an error.'
    )

    test.done()
  },
  tearDown: function(callback) {
    unloadModule()
    callback()
  }
}
