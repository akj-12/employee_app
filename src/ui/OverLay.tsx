/** @format */

import React from "react";

type OverLayProps = {
    children?: React.ReactNode;
    onClose?: () => void;
};

const OverLay: React.FC<OverLayProps> = ({ children, onClose }) => {
    return (
        // backdrop
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                onClick={onClose}
                aria-hidden
            />

            {/* modal */}
            <div className='relative z-10 max-w-2xl w-full mx-4 bg-white rounded-lg shadow-lg p-10 text-black'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
                    aria-label='Close'
                >
                    ✕
                </button>

                <div>
                    {children ?? (
                        <div className='text-center'>Overlay Content</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverLay;
