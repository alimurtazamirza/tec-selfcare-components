"use client";
import React, {
    createContext,
    useContext,
    useState,
} from "react";

const AppContext = createContext();

export function AppWrapper({children, serverSession = {}}) {
    const [session, setSession] = useState({...serverSession});

    const [configurations, setConfigurations] = useState({
        appName: "Tec Self-Care PWA",
        cacheTime: "",
        themes: [],
        defaultTheme: null,
        languages: [{label: "English", value: "en", direction: "ltr"}],
        translations: {},
        defaultLanguage: {
            label: "English",
            value: "en",
            direction: "ltr",
        }
    });
    const [loading, setLoading] = useState(false);
    const [snackBarState, setSnackBar] = useState({
        open: false,
        autoHideDuration: 3000,
        message: "",
        variant: "success", //["success", "info", "error", "warning"]
        vertical: "top",
        horizontal: "right",
    });
    const setSnackBarState = (values) => {
        setSnackBar({
            ...snackBarState,
            ...values,
        });
    };
    const setConfigurationsState = (values) => {
        setConfigurations({
            ...configurations,
            ...values,
        });
    };

    return (
        <AppContext.Provider
            value={{
                session,
                setSession,
                loading,
                setLoading,
                snackBarState,
                setSnackBarState,
                configurations,
                setConfigurationsState
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
