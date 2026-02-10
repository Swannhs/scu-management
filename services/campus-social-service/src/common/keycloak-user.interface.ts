export interface KeycloakUser {
  sub: string;
  tenant_id?: string;
  realm_access?: {
    roles?: string[];
  };
  resource_access?: Record<string, { roles?: string[] }>;
}
