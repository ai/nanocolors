delete process.env.FORCE_COLOR
delete process.env.CI
process.env.FORCE_COLOR = '1'
process.argv.push('--no-color')
