"use client";

import { useCallback, useRef, useState } from "react";

type ControllableStateOptions<T> = {
  /** Controlled value. When defined, the component is controlled. */
  value?: T | undefined;
  /** Initial value for uncontrolled use. */
  defaultValue: T;
  /** Called with every requested change, in both modes. */
  onChange?: ((value: T) => void) | undefined;
};

/**
 * State that works both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`),
 * the convention every stateful Avero component follows.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [isControlled ? value : internal, setValue];
}
