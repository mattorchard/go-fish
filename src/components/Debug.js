import React from "react";

const Debug = ({children}) => <pre>{JSON.stringify(children, null, 2)}</pre>;

export default Debug;