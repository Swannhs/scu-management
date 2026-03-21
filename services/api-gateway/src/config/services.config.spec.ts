import { getServiceByName, getServiceConfig } from './services.config';

describe('services.config', () => {
  it('routes campus-social feed endpoints through campus-social-service', () => {
    const service = getServiceConfig('/v1/feed');

    expect(service?.name).toBe('campus-social-service');
    expect(service?.path).toBe('/v1/feed');
  });

  it('exposes the canonical campus-social service name', () => {
    const service = getServiceByName('campus-social-service');

    expect(service).toBeDefined();
    expect(service?.url).toContain('campus-social-service');
  });
});
