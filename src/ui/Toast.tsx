/** @format */

import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
    message?: string;
    error?: Error | string | null;
    type?: ToastType;
    duration?: number; // defaults to 3000ms
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    onClose: () => void;
    onError?: (error: Error | string) => void;
}

const Toast = ({
    message,
    error,
    type = "success",
    duration = 3000,
    position = "top-right",
    onClose,
    onError,
}: ToastProps) => {
    const [progress, setProgress] = useState(100);

    // Resolve the display message from either string message or error object
    const displayMessage = error
        ? error instanceof Error
            ? error.message
            : error
        : message || "";

    const finalType = error ? "error" : type;

    useEffect(() => {
        if (error) {
            onError?.(error);
        }

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose, error, onError]);

    useEffect(() => {
        const intervalTime = 30;
        const totalSteps = duration / intervalTime;
        const decrement = 100 / totalSteps;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev - decrement;
                return next < 0 ? 0 : next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [duration]);

    const positionClasses = {
        "top-right": "top-4 right-4 md:top-6 md:right-6 animate-slide-in-right",
        "top-left": "top-4 left-4 md:top-6 md:left-6 animate-slide-in-left",
        "bottom-right": "bottom-4 right-4 md:bottom-6 md:right-6 animate-slide-in-right",
        "bottom-left": "bottom-4 left-4 md:bottom-6 md:left-6 animate-slide-in-left",
    };

    // Modern styled SVGs
    const SuccessIcon = () => (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
    );

    const ErrorIcon = () => (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        </div>
    );

    const InfoIcon = () => (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400">
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
    );

    const CloseIcon = () => (
        <svg
            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );

    const theme = {
        success: {
            title: "Success",
            bar: "bg-emerald-500 dark:bg-emerald-400",
            icon: <SuccessIcon />,
        },
        error: {
            title: "Error",
            bar: "bg-rose-500 dark:bg-rose-400",
            icon: <ErrorIcon />,
        },
        info: {
            title: "Information",
            bar: "bg-sky-500 dark:bg-sky-400",
            icon: <InfoIcon />,
        },
    }[finalType];

    return (
        <div
            className={`fixed z-50 flex items-start gap-3.5 w-[calc(100%-2rem)] max-w-sm p-4 rounded-xl border bg-white/95 dark:bg-zinc-900/95 border-zinc-200/80 dark:border-zinc-800/85 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 pointer-events-auto ${positionClasses[position]}`}
            role="alert"
        >
            <div className="flex-shrink-0 mt-0.5">{theme.icon}</div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {theme.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed break-words">
                    {displayMessage}
                </p>
            </div>

            <button
                onClick={onClose}
                className="flex-shrink-0 p-1 -mr-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800"
                aria-label="Close toast"
            >
                <CloseIcon />
            </button>

            {/* Sleek bottom countdown bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100 dark:bg-zinc-800/60 rounded-b-xl overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ease-out ${theme.bar}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default Toast;
