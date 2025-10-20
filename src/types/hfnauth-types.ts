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

export interface HFNAuthElement {
  loginCallback?: (res: any) => void;
  handleProfileAuthentication: (success: boolean) => void;
  handleErrorMessage: (
    message: string,
    callback: (options: { okClicked: boolean }) => void,
    options: {
      showOkBtn: boolean;
      showCancel: boolean;
      showRetryBtn: boolean;
      btnText: string;
    }
  ) => void;
  triggerAuth: () => void;
  addEventListener: (event: string, handler: (event: any) => void) => void;
  removeEventListener: (event: string, handler: (event: any) => void) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hfn-auth': {
        ref?: React.Ref<any>;
        config?: string;
        showCancel?: string;
        authType?: string;
        subPath?: string;
      };
    }
  }
}

export * from './hfnauth-types';
