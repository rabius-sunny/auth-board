import { fetchReqRes } from '../req-res'
import { cookies } from 'next/headers'

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn()
}))

// Mock global fetch
global.fetch = jest.fn()

describe('fetchReqRes', () => {
  const mockCookies = {
    get: jest.fn()
  }

  const originalEnv = process.env.REQRES_SECRET

  beforeEach(() => {
    jest.clearAllMocks()
    ;(cookies as jest.Mock).mockResolvedValue(mockCookies)
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' })
    })
    process.env.REQRES_SECRET = 'test-api-key'
  })

  afterEach(() => {
    process.env.REQRES_SECRET = originalEnv
  })

  it('makes a fetch request with default headers', async () => {
    mockCookies.get.mockReturnValue(undefined)

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'GET'
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'test-api-key'
        }
      })
    )
  })

  it('includes Authorization header when authToken exists', async () => {
    mockCookies.get.mockReturnValue({ value: 'test-token-123' })

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'GET'
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: 'Bearer test-token-123',
          'Content-Type': 'application/json',
          'x-api-key': 'test-api-key'
        }
      })
    )
  })

  it('does not include Authorization header when authToken is missing', async () => {
    mockCookies.get.mockReturnValue(undefined)

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'GET'
    })

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1]
    expect(fetchCall.headers).not.toHaveProperty('Authorization')
  })

  it('merges custom headers with default headers', async () => {
    mockCookies.get.mockReturnValue(undefined)

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Custom-Header': 'custom-value'
      }
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Custom-Header': 'custom-value',
          'x-api-key': 'test-api-key'
        })
      })
    )
  })

  it('passes through other fetch options', async () => {
    mockCookies.get.mockReturnValue(undefined)

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' })
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'John' })
      })
    )
  })

  it('retrieves authToken cookie correctly', async () => {
    mockCookies.get.mockReturnValue({ value: 'my-auth-token' })

    await fetchReqRes('https://reqres.in/api/users', {
      method: 'GET'
    })

    expect(mockCookies.get).toHaveBeenCalledWith('authToken')
  })
})
