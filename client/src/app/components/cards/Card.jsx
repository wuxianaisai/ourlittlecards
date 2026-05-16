import { forwardRef } from "react";
import Image from "next/image";

const Card = forwardRef(({ id, frontSrc, frontAlt, backSrc, backAlt }, ref) => {
    return (
        <div className="card" id={id} ref={ref}>
            <div className="card-wrapper">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <Image
                            priority
                            src={frontSrc}
                            alt={frontAlt}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="flip-card-back">
                        <Image
                            priority
                            src={backSrc}
                            alt={backAlt}
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

Card.displayName = "card";

export default Card;