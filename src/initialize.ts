import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

import type { EncinitasConfig } from './types'
import type { Faro } from '@grafana/faro-web-sdk'

/**
 * Initializes the library with given configuration.
 * @param {EncinitasConfig} config - The configuration object for initialization.
 * @returns The Encinitas instance.
 */
export function initializeEncinitas (config: EncinitasConfig): Faro {
  validateConfig(config)

  const faro = initializeFaro({
    url: config.url,
    app: config.app,
    sessionTracking: config.sessionTracking,
    instrumentations: [
      ...getWebInstrumentations(),
      new TracingInstrumentation()
    ]
  })

  return faro
}

/**
 * Validates the given Encinitas configuration object.
 * Throws an error if the configuration is invalid.
 *
 * @param {EncinitasConfig} config - The configuration object to validate.
 */
export function validateConfig (config: EncinitasConfig): void {
  if (config.app === null || config.app === undefined || typeof config.app !== 'object') {
    throw new Error('App configuration is missing or invalid.')
  }

  if (config.url === null || config.url === undefined ||
      config.url === '' || typeof config.url !== 'string' || !isValidUrl(config.url)) {
    throw new Error('Invalid or missing URL in configuration.')
  }

  if (config.app.name === undefined || config.app.name === null ||
      config.app.name === '' || typeof config.app.name !== 'string') {
    throw new Error('Invalid or missing app name.')
  }
  if (config.app.version === undefined || config.app.version === null ||
      config.app.version === '' || typeof config.app.version !== 'string') {
    throw new Error('Invalid or missing app version.')
  }
  if (config.app.environment === undefined || config.app.environment === null ||
      config.app.environment === '' || typeof config.app.environment !== 'string') {
    throw new Error('Invalid or missing app environment.')
  }

  if (typeof config.sessionTracking.enabled !== 'boolean') {
    throw new Error('Invalid session tracking configuration.')
  }
}

/**
 * Checks if a given string is a valid URL.
 *
 * @param {string} url - The string to validate as a URL.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
 */
function isValidUrl (url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
