// components/Button.jsx

function Button({
    children,
    type = "button",
    variant = "primary",     // primary, secondary, outline, danger
    size = "md",             // sm, md, lg
    className = "",
    disabled = false,
    loading = false,
    ...props
}) {
    const baseStyles = `
        w-full 
        font-medium 
        rounded-xl 
        transition-all 
        duration-200 
        flex 
        items-center 
        justify-center 
        gap-2
        disabled:cursor-not-allowed
    `;

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white active:bg-gray-800",
        outline: "border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50",
        danger: "bg-red-600 hover:bg-red-700 text-white active:bg-red-800"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            
            {children}
        </button>
    );
}

export default Button;