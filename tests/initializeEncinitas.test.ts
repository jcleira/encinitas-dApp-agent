import { initializeFaro } from '@grafana/faro-web-sdk'

import { initializeEncinitas } from '../src/index'
import type { EncinitasConfig } from '../src/types'

jest.mock('@grafana/faro-web-sdk', () => ({
  initializeFaro: jest.fn(),
  getWebInstrumentations: jest.fn().mockImplementation(() => ([]))
}))

jest.mock('@grafana/faro-web-tracing', () => ({
  TracingInstrumentation: jest.fn().mockImplementation(() => ({}))
}))

describe('initializeEncinitas', () => {
  const validConfig: EncinitasConfig = {
    url: 'https://valid-url.com',
    app: {
      name: 'TestApp',
      version: '1.0.0',
      environment: 'production'
    },
    sessionTracking: {
      enabled: true
    }
  }

  it('should call initializeFaro with the correct parameters', () => {
    initializeEncinitas(validConfig)

    expect(initializeFaro).toHaveBeenCalledWith({
      url: validConfig.url,
      app: validConfig.app,
      sessionTracking: validConfig.sessionTracking,
      instrumentations: expect.any(Array)
    })
  })

  it('should throw an error for an invalid URL', () => {
    const invalidConfig = { ...validConfig, url: 'invalid-url' }
    expect(() => initializeEncinitas(invalidConfig)).toThrow('Invalid or missing URL in configuration.')
  })

  it('should throw an error for missing app configuration', () => {
    const invalidConfig = { ...validConfig, app: undefined as any }
    expect(() => initializeEncinitas(invalidConfig as EncinitasConfig)).toThrow('App configuration is missing or invalid.')
  })

  it('should throw an error for invalid app name', () => {
    const invalidConfig = { ...validConfig, app: { ...validConfig.app, name: '' } }
    expect(() => initializeEncinitas(invalidConfig)).toThrow('Invalid or missing app name.')
  })

  it('should throw an error for invalid app version', () => {
    const invalidConfig = { ...validConfig, app: { ...validConfig.app, version: '' } }
    expect(() => initializeEncinitas(invalidConfig)).toThrow('Invalid or missing app version.')
  })

  it('should throw an error for invalid app environment', () => {
    const invalidConfig = { ...validConfig, app: { ...validConfig.app, environment: '' } }
    expect(() => initializeEncinitas(invalidConfig)).toThrow('Invalid or missing app environment.')
  })

  it('should throw an error for invalid session tracking configuration', () => {
    const invalidConfig = { ...validConfig, sessionTracking: { enabled: 'not-a-boolean' } }
    expect(() => initializeEncinitas(invalidConfig as unknown as EncinitasConfig)).toThrow('Invalid session tracking configuration.')
  })
})
