/**
 * App Store for global application state (Currency, Language, etc.)
 * Pattern matches UserStore
 */

export type CurrencyCode = "INR" | "USD";

interface AppState {
    currency: CurrencyCode;
}

class AppStore {
    private state: AppState = {
        currency: "INR", // Default
    };
    private listeners: Array<(state: AppState) => void> = [];

    constructor() {
        if (typeof window !== "undefined") {
            const storedCurrency = localStorage.getItem("fbh_currency");
            if (storedCurrency && (storedCurrency === "INR" || storedCurrency === "USD")) {
                this.state.currency = storedCurrency as CurrencyCode;
            }
        }
    }

    setCurrency(currency: CurrencyCode) {
        this.state.currency = currency;
        if (typeof window !== "undefined") {
            localStorage.setItem("fbh_currency", currency);
        }
        this.notifyListeners();
    }

    getCurrency(): CurrencyCode {
        return this.state.currency;
    }

    getState(): AppState {
        return this.state;
    }

    subscribe(listener: (state: AppState) => void) {
        this.listeners.push(listener);
        // Return unsubscribe
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.state));
    }
}

const appStoreInstance = new AppStore();

export const appActions = {
    setCurrency: (currency: CurrencyCode) => appStoreInstance.setCurrency(currency),
    getCurrency: () => appStoreInstance.getCurrency(),
};

export default appStoreInstance;
