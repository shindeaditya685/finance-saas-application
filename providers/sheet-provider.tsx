"use client";

import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/new-account-sheet";

const SheetProvider = () => {
  // resolve hydration error if it occurs
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
    </>
  );
};

export default SheetProvider;
