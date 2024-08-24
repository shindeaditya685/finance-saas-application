import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import Select from "@/components/Select";

export default function useSelectAccountAndConfirmTransaction(): [
  () => JSX.Element,
  () => Promise<string | undefined>
] {
  const selectedValue = useRef<string | undefined>(undefined);
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
    reject?: (reason?: any) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<string | undefined>((resolve, reject) => {
      setPromise({ resolve, reject });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectedValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const handleConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Account</DialogTitle>
            <DialogDescription>
              Please select an account to continue
            </DialogDescription>
          </DialogHeader>
          <Select
            placeholder="Select an account"
            options={accountOptions}
            onCreate={onCreateAccount}
            onChange={(value) => {
              selectedValue.current = value;
            }}
            disabled={accountQuery.isLoading || accountMutation.isPending}
          />
          <DialogFooter className="flex items-center gap-3">
            <Button className="w-full" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="w-full" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [handleConfirmDialog, confirm];
}
