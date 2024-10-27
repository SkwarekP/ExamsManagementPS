export type Severities = "error" | "warning" | "success"

export interface SnackbarProps {
    severity: Severities;
    message: string;
    submessage?: string;
    title?: string;
  }
