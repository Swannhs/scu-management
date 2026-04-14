import React from "react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
        </div>
    );
}
