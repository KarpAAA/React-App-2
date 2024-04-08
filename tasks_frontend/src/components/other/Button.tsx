import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            style={{backgroundColor: '#4188A7'}}
            className="mr-5 text-white rounded px-2 "
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
