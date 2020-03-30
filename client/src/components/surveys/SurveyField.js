import React from "react";

export default ({ input, label, meta: {error, touched} }) => (
    <div>
        <input {...input} autoComplete={'off'} type={'text'} value={'jedavard@gmail.com'}/>
        <label>{label}&nbsp;<i style={{color: 'darkred'}}>{touched && error}</i></label>
    </div>
)