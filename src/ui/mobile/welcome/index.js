"use client";

import {useState} from "react";
import WelcomeStep from "./WelcomeStep";
import {redirect} from "next/navigation";
const content = [
    {
        text: {simple: "Enjoy the best flexible mobile plans and", hilighted: "Internet."},
        image: "/images/welcome_step_one.png"
    },
    {
        text: {simple: "Explore Sudani's world of endless", hilighted: "content"},
        image: "/images/welcome_step_two.png"
    },
    {
        text: {simple: "Monitor your data, call, and SMS usage in", hilighted: "real-time"},
        image: "/images/welcome_step_three.png"
    },
    {
        text: {simple: "Customize your experience &", hilighted: "preferences"},
        image: "/images/welcome_step_four.png"
    }
];

export default function Welcome() {
    const [step, setStep] = useState(0);
    const CurrentStepContent = content[step];

    function onNext() {

        setStep((prev) => {
            if (prev + 1 === content.length)
                redirect("/login")
            return Math.min(prev + 1, content.length - 1)
        })

    }

    return (
        <WelcomeStep
            onNext={onNext}
            content={CurrentStepContent}
        />
    );
}
