import React, { forwardRef } from "react";

export const Item = forwardRef(({ id, ...props }, ref) => {
    return (
        <div {...props} ref={ref}>
            {id}
        </div>
    );
});

export default Item;
