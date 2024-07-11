import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="text rounded
            text-blue-custom hover:text-blue-custom-hvr"
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;
