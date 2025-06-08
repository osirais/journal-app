"use client";

// react-scan must be imported before react
// prettier-ignore
import { scan, setOptions } from "react-scan";
import { JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({ enabled: true });
    setOptions({ showToolbar: true });
  }, []);

  return <></>;
}
