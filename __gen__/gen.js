const { pascalCase } = require('change-case')
const { makeRepo, ask, replacer, getCommit, gitFiles } = require('gen-util')
const $ = require('shelljs')

const log = msg => console.log('👷🏾‍♀️ ' + msg)

const main = async () => {
  log('cwd')
  await $.cd(`${__dirname}/..`)

  log('set up git')
  const origin = await getCommit() // must come before makeRepo
  await $.exec('git remote rename origin template')
  await $.exec('git branch -m template')

  log('get config info')
  const name = await ask('project npm name?')
  const author = await ask('your name?', {default: 'Andrew J. Monks <a@monks.co>'})
  const repo = await makeRepo()
  const currentYear = new Date().getFullYear()
  const config = {name, repo, author, origin, currentYear}

  log('write log')
  $.ShellString(JSON.stringify(config, undefined, 2))
    .to(`.gen.json`)

  log('delete tracks')
  $.rm('-r', __dirname)

  log('do repalcements')
  const files = gitFiles()
  const replace = replacer(files)
  await replace(/__CURRENT_YEAR/, currentYear)
  await replace(/__PACKAGE_NAME/, name)
  await replace(/__COMPONENT_NAME/, pascalCase(name))
  await replace(/__AUTHOR_NAME/, author)

  log('yarn')
  await $.exec('yarn')

  log('make new git')
  await $.exec('git checkout -b master')
  await $.exec('git add .')
  await $.exec(`git commit -am 'GEN: Initial commit\n\nfrom ${origin}'`)
  await $.exec('git push -u origin master')

  console.log(`

💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥

all done!
build info saved to ./.gen.json

next steps:

  - run:
    $ semantic-release-cli setup
`)
  process.exit(0)
}

main()

