// file: app/(dashboard)/transactions/importTypes.ts

export type ImportResult = {
  data: any[];
  errors: any[];
  meta: Record<string, any>;
};

export const INITIAL_IMPORT_RESULTS: ImportResult = {
  data: [],
  errors: [],
  meta: {},
};
