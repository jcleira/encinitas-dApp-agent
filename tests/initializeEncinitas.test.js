"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faro_web_sdk_1 = require("@grafana/faro-web-sdk");
const index_1 = require("../src/index");
jest.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: jest.fn(),
    getWebInstrumentations: jest.fn().mockImplementation(() => ([]))
}));
jest.mock('@grafana/faro-web-tracing', () => ({
    TracingInstrumentation: jest.fn().mockImplementation(() => ({}))
}));
describe('initializeEncinitas', () => {
    const validConfig = {
        url: 'https://valid-url.com',
        app: {
            name: 'TestApp',
            version: '1.0.0',
            environment: 'production'
        },
        sessionTracking: {
            enabled: true
        }
    };
    it('should call initializeFaro with the correct parameters', () => {
        (0, index_1.initializeEncinitas)(validConfig);
        expect(faro_web_sdk_1.initializeFaro).toHaveBeenCalledWith({
            url: validConfig.url,
            app: validConfig.app,
            sessionTracking: validConfig.sessionTracking,
            instrumentations: expect.any(Array)
        });
    });
    it('should throw an error for an invalid URL', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { url: 'invalid-url' });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('Invalid or missing URL in configuration.');
    });
    it('should throw an error for missing app configuration', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { app: undefined });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('App configuration is missing or invalid.');
    });
    it('should throw an error for invalid app name', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { app: Object.assign(Object.assign({}, validConfig.app), { name: '' }) });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('Invalid or missing app name.');
    });
    it('should throw an error for invalid app version', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { app: Object.assign(Object.assign({}, validConfig.app), { version: '' }) });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('Invalid or missing app version.');
    });
    it('should throw an error for invalid app environment', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { app: Object.assign(Object.assign({}, validConfig.app), { environment: '' }) });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('Invalid or missing app environment.');
    });
    it('should throw an error for invalid session tracking configuration', () => {
        const invalidConfig = Object.assign(Object.assign({}, validConfig), { sessionTracking: { enabled: 'not-a-boolean' } });
        expect(() => (0, index_1.initializeEncinitas)(invalidConfig)).toThrow('Invalid session tracking configuration.');
    });
});
//# sourceMappingURL=initializeEncinitas.test.js.map