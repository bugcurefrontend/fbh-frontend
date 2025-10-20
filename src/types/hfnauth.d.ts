declare module 'hfnauth/main' {
  export interface SRCMProfileParams {
    srcmBaseURL: string;
    xClientId: string;
    queryParams: string;
  }

  export interface SRCMProfileResponse {
    data?: {
      results?: Array<{
        firstName?: string;
        lastName?: string;
        email?: string;
        [key: string]: any;
      }>;
    };
  }

  export interface AuthParams {
    authUrl: string;
    realm: string;
    client_id: string;
  }

  export interface LogoutResponse {
    error?: any;
  }

  export function getSRCMProfile(params: SRCMProfileParams): Promise<SRCMProfileResponse>;
  export function getRefreshToken(params: AuthParams): Promise<any>;
  export function userLogout(params: AuthParams, subPath: string): Promise<LogoutResponse>;
}