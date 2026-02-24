declare module 'hfnauth/main' {
  export interface SRCMProfileParams {
    srcmBaseURL: string;
    xClientId: string;
    queryParams: string;
  }

  export interface MeProfileParams {
    srcmMeUrl: string;
    xClientId: string;
    queryParams: string[];
  }

  export interface SRCMProfileResponse {
    data?: {
      results?: Array<{
        firstName?: string;
        lastName?: string;
        email?: string;
        [key: string]: unknown;
      }>;
      [key: string]: unknown;
    };
  }

  export interface AuthParams {
    authUrl: string;
    realm: string;
    client_id: string;
  }

  export interface LogoutResponse {
    error?: unknown;
  }

  export function getMeProfile(params: MeProfileParams): Promise<SRCMProfileResponse>;
  export function getSRCMProfile(params: SRCMProfileParams): Promise<SRCMProfileResponse>;
  export function getRefreshToken(params: AuthParams): Promise<unknown>;
  export function userLogout(params: AuthParams, subPath: string): Promise<LogoutResponse>;
}
