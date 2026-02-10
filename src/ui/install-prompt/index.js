"use client";

import {useEffect, useState} from "react";
import {Button} from "@mui/material";

export default function InstallPopup() {
    const [promptEvent, setPromptEvent] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setPromptEvent(e);
            setShow(true); // auto popup
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const install = async () => {
        if (!promptEvent) return;
        await promptEvent.prompt();
        setShow(false);
    };

    if (!show) return null;

    return (
        <div style={overlay}>
            <div style={popup}>
                <h3>Install Tec Self-Care PWA App</h3>
                <p>Better experience, faster access.</p>

                <div style={{display: "flex", gap: 10, mr: 0, justifyContent: "flex-end"}}>
                    <Button variant="outlined" color="#7c3aed"
                            onClick={() => setShow(false)}>Later</Button>
                    <Button variant="contained" sx={{background: "#2E8B57"}} onClick={install}>Install</Button>
                </div>
            </div>
        </div>
    );
}

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
};

const popup = {
    background: "#EEF3F7",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    maxWidth: 320,
};
