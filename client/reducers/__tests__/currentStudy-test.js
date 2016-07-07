import expect from 'expect'

import currentStudy from '../currentStudy'

describe('currentStudy reducer', () => {
  it('keeps the current study if starting to fetch the same one', () => {
    expect(currentStudy(
      { id: 1, name: 'socialTest' },
      {
        type: 'FETCH_STUDY',
        status: 'started',
        id: 1
      }
    )).toEqual({ id: 1, name: 'socialTest' })
  })

  it('sets the current study to null if starting to fetch another study', () => {
    expect(currentStudy(
      { id: 1, name: 'socialTest' },
      {
        type: 'FETCH_STUDY',
        status: 'started',
        id: 2
      }
    )).toEqual(null)
  })

  it('replaces the current study with the payload when succeeded fetching', () => {
    expect(currentStudy(
      { id: 1, name: 'socialTest' },
      {
        type: 'FETCH_STUDY',
        status: 'succeeded',
        payload: { id: 1, name: 'socialTest', description: 'A social study.', type: 'social' }
      }
    )).toEqual({
      id: 1,
      name: 'socialTest',
      description: 'A social study.',
      type: 'social',
    })
  })
})
