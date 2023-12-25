/**
 * Configuration object for initializing the library.
 */

export interface EncinitasConfig {
  /**
   * The URL to the Encinitas collector.
   */
  url: string

  /**
   * Application specific configuration.
   * @property {string} name - The name of your application.
   * @property {string} version - The current version of your application.
   * @property {string} environment - The environment your application is running in (e.g., 'production', 'development').
   */
  app: {
    name: string
    version: string
    environment: string
  }
  /**
   * Configuration for session tracking.
   * @property {boolean} enabled - Set to `true` to enable session tracking, `false` to disable.
   */
  sessionTracking: {
    enabled: boolean
  }
}
