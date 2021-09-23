delete process.env.FORCE_COLOR
delete process.env.CI
process.env.TERM = 'dumb'
Object.defineProperty(process, 'platform', {
  value: 'win32'
})
