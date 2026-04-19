// components/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    type = "text",
    placeholder = "",
    error,
    className = "",
    labelClassName = "",
    containerClassName = "",
    ...props
}, ref) => {

    const isFileInput = type === "file";

    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label 
                    className={`block text-sm font-medium text-gray-700 mb-1.5 ${labelClassName}`}
                >
                    {label}
                    {isFileInput && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`
                    w-full 
                    px-4 
                    py-3 
                    rounded-xl 
                    border 
                    border-gray-300 
                    focus:border-blue-600 
                    focus:ring-2 
                    focus:ring-blue-100 
                    outline-none 
                    transition-all 
                    duration-200
                    text-gray-900
                    ${isFileInput 
                        ? 'file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' 
                        : ''
                    }
                    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
});

export default Input;