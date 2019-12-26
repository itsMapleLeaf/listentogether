// @ts-check
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const schemaPath = path.join(`${__dirname}/../schema.prisma`)

/** @type {import('child_process').ChildProcess} */
let child

function run() {
  if (child) child.kill()
  child = exec('prisma2 generate')
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

run()
fs.watch(schemaPath, () => {
  console.log('Schema changed')
  run()
})
