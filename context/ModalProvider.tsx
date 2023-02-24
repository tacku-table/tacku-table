import React, { createContext, useState } from "react";

export const ModalStateContext = createContext<any>(null);
export const ModalSetterContext = createContext<any>(null);

function ModalProvider({ children }: any) {
    const [state, setState] = useState({
        type: null,
        props: null,
    });

    return (
        <ModalSetterContext.Provider value={setState}>
            <ModalStateContext.Provider value={state}>
                {children}
            </ModalStateContext.Provider>
        </ModalSetterContext.Provider>
    );
}

export default ModalProvider;
