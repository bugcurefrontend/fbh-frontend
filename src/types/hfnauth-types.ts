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

export interface AuthCallbackResponse {
  data?: {
    access_token?: string;
    [key: string]: unknown;
  };
}

export interface HFNAuthElement {
  loginCallback?: (res: AuthCallbackResponse) => Promise<boolean> | boolean;
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
  checkAuthStatus?: () => void;
  addEventListener: (event: string, handler: (event: Event) => void) => void;
  removeEventListener: (event: string, handler: (event: Event) => void) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hfn-auth': {
        ref?: React.Ref<HFNAuthElement>;
        config?: string;
        showCancel?: string;
        authType?: string;
        subPath?: string;
      };
    }
  }
}
