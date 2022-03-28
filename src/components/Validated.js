import React, { useEffect, useRef, useState } from "react";

export default function Validated(props) {
  const [error, setError] = useState("");
  const validated = useRef("");
  
  useEffect(() => {
    validated.current = props.startedFilled;
    props.addToValidationList(validated);
  }, []);

  function onUpdate() {
    setError("");
    validated.current = true;

    if (props.types && props.types.limited) {
      if (props.value.current.value.length > props.types.limited) {
        setError(`Maximum of ${props.types.limited} characters`);
        validated.current = false;
      }
    }

    if (!props.value.current.value) {
      setError("Required");
      validated.current = false;
    }
  }

  return React.cloneElement(props.children, {
    error: error !== "",
    helperText: error,
    onBlur: onUpdate,
  });
}
