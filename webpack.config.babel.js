import R from 'ramda'
import { resolve } from 'path'

import {
  addBabel,
  addExtern,
  addMinify,
  addName,
  addOutputPath,
  addProduction,
  addProgress,
  addSourcemap,
  addUMD,
  base
} from '@amonks/webpack-helpers'

const addExterns = R.pipe(
  addExtern('react', 'React'),
  addExtern('react-dom', 'ReactDOM')
)

const common = R.pipe(
  addExterns,
  addSourcemap,
  addBabel,
  addProgress,
  addName(require('./package.json').name)
)

const addSrc = R.pipe(
  R.assoc('entry', [resolve(__dirname, 'src/index.js')])
)

const config = [
  R.pipe(
    addSrc,
    addOutputPath('umd'),
    common,
    addUMD
  )(base),
  R.pipe(
    addSrc,
    addOutputPath('umd'),
    common,
    addUMD,
    addMinify,
    addProduction
  )(base)
]

export default config

