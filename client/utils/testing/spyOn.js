import expect from 'expect'

let spies

export default function spyOn (obj, methodName) {
  const spy = expect.spyOn(obj, methodName)
  spies.push(spy)
  return spy
}

beforeEach(() => {
  spies = []
})

afterEach(() => {
  spies.forEach(spy => spy.restore())
})
