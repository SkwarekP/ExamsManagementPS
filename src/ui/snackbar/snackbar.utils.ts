export type Severities = "error" | "warning" | "success"

export interface SnackbarProps {
    severity: Severities;
    message: string;
    title?: string;
  }
