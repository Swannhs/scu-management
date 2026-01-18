export interface AuthenticatedUser {
  sub: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  preferred_username?: string;
  email_verified?: boolean;
  tenant_id?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: Record<string, { roles: string[] }>;
  roles?: string[];
  // Add other standard OIDC claims if needed
}
