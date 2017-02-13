const { pascalCase } = require('change-case')
const { makeRepo, ask, replacer, getCommit } = require('gen-util')
const $ = require('shelljs')

const main = async () => {
  console.log('cwd')
  await $.cd(`${__dirname}/..`)

  console.log('config')
  const origin = await getCommit() // must come before makeRepo
  await $.exec('git remote rename origin template')

  const name = await ask('project npm name?')
  const author = await ask('your name?', {default: 'Andrew J. Monks <a@monks.co>'})
  const repo = await makeRepo()
  const currentYear = new Date().getFullYear()
  const config = {name, repo, author, origin, currentYear}

  console.log('write log')
  $.ShellString(JSON.stringify(config, undefined, 2))
    .to(`__gen__/gen.json`)

  console.log('do repalcements')
  const files = $.find('.')
  const replace = replacer(files)
  await replace(/__CURRENT_YEAR/, currentYear)
  await replace(/__PACKAGE_NAME/, name)
  await replace(/__COMPONENT_NAME/, pascalCase(name))
  await replace(/__AUTHOR_NAME/, author)

  console.log('yarn')
  await $.exec('yarn')

  console.log('make new git')
  await $.exec('git checkout -b master')
  await $.exec('git add .')
  await $.exec(`git commit -am 'GEN: Initial commit\n\nfrom ${origin}'`)

  console.log('💥')
  console.log('now run semantic-release-cli setup')
  process.exit(0)
}

main()

