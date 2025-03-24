import { Mode } from "react-hook-form";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FormInterface {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const useZustandForm = create<FormInterface>()(
    devtools(
        immer((set) => ({
            mode: "all",
            setMode: (mode) => set((state) => void (state.mode = mode)),
        }))
    )
);

export default useZustandForm;
