import '../assets/styles/pop-up.css';
import '../assets/styles/custum-animations.css';
import { forwardRef } from "react";

const PopUp = forwardRef<HTMLDivElement, { direction: string }>(({ direction }, ref) => {
  return (
    <div ref={ref} className={`pop-up pop-up-${direction} heartbeat`}>
      <div className="pop-up-header">Benvenuto nel nostro sito!</div>
      <div className="pop-up-content">
        Siamo felici di averti con noi. Dai un'occhiata alle nostre offerte e inizia la tua esperienza con noi.
      </div>
      
    </div>
  );
});

export default PopUp;
