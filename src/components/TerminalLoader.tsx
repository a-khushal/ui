'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TerminalIntroProps {
    text?: string;
    userName?: string;
    pcName?: string;
    resizable?: boolean;
}

export function TerminalIntro({
    text = 'npm install competence',
    userName = 'dev',
    pcName = 'mac',
    resizable = false
}: TerminalIntroProps) {
    const [typed, setTyped] = useState('');
    const [height, setHeight] = useState(500);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setTyped(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 80);
        return () => clearInterval(interval);
    }, [text]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!resizable) return;

        const startY = e.clientY;
        const startHeight = height;

        const onMouseMove = (e: MouseEvent) => {
            const newHeight = startHeight + (e.clientY - startY);
            if (newHeight >= 200 && newHeight <= 800) {
                setHeight(newHeight);
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div
                className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800"
                style={{ height: resizable ? height : 500 }}
            >
                <div className="flex items-center justify-between px-5 py-3 bg-[#2d2d2d] border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                            <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                        </div>
                        {/* <span className="text-sm text-gray-400 font-mono">
                            {userName} — zsh — 80×24
                        </span> */}
                    </div>
                </div>

                <div className="p-6 font-mono text-base text-gray-300">
                    <div className="flex items-center">
                        <span className="text-green-400">{userName}@{pcName}-Mac</span>
                        <span className="text-cyan-400"> ~ %</span>
                        <span className="ml-3 text-white">{typed}</span>
                        <Cursor />
                    </div>
                </div>

                {resizable && (
                    <div
                        className="h-2 bg-gray-700 cursor-row-resize hover:bg-gray-600 transition-colors"
                        onMouseDown={handleMouseDown}
                    />
                )}
            </div>
        </div>
    );
}

export function TerminalIntroUsage() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-black p-6">
            <TerminalIntro text="npx create-next-app@latest" userName='a-khushal' pcName='phoenix' />
        </div>
    );
}

function Cursor() {
    return (
        <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2.5 h-5 bg-white ml-1.5 align-middle"
        />
    );
}