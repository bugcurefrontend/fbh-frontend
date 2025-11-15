interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: string;
  firebaseUid?: string;
  keycloak_user_id?: string;
  cityId?: string;
  city?: any;
  state?: string;
  apiToken?: string;
  tokenData?: {
    accessToken?: string;
  };
  [key: string]: any;
}

class UserStore {
  private user: UserData | null = null;
  private listeners: Array<(user: UserData | null) => void> = [];

  constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('authInfo');
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser);
        } catch (error) {
          this.user = null;
        }
      }
    }
  }

  setUser(userData: UserData) {
    this.user = userData;

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authInfo', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userProfile', JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        userId: userData.userId,
        firebaseUid: userData.firebaseUid,
        cityId: userData.cityId,
        state: userData.state,
      }));
    }

    // Notify listeners
    this.notifyListeners();
  }

  getUser(): UserData | null {
    return this.user;
  }

  clearUser() {
    this.user = null;

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authInfo');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('landingPage');
      localStorage.removeItem('accessToken');
    }

    // Notify listeners
    this.notifyListeners();
  }

  subscribe(listener: (user: UserData | null) => void) {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }
}

// Create singleton instance
const userStoreInstance = new UserStore();

// Export actions matching senior's pattern
export const actions = {
  setUser: (userData: UserData) => userStoreInstance.setUser(userData),
  getUser: () => userStoreInstance.getUser(),
  clearUser: () => userStoreInstance.clearUser(),
};

// Export store instance
export default userStoreInstance;
