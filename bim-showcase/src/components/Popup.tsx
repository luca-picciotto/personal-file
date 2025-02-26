import '../assets/styles/popup.css'
import { forwardRef } from "react";

export const Popup = forwardRef<HTMLDivElement >(( _ , ref) => {
    return (
        <div ref={ref} className={`popup `}></div>
    );
});
export default Popup