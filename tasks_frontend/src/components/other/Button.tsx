import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="text-white rounded px-2 bg-blue-custom hover:bg-blue-custom-hvr"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
