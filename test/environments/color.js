delete process.env.FORCE_COLOR
delete process.env.CI
process.env.TERM = 'dumb'
process.argv.push('--color')
