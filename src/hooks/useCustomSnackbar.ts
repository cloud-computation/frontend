import { useSnackbar } from "notistack";

export function useCustomSnackbar(): {
    showSuccessSnackbar: (message: string) => void;
    showErrorSnackbar: (message: string) => void;
    showDefaultSnackbar: (message: string) => void;
    showWarningSnackbar: (message: string) => void;
    showInfoSnackbar: (message: string) => void;
} {
    const { enqueueSnackbar } = useSnackbar();

    return {
        showErrorSnackbar: (message) => enqueueSnackbar(message, { variant: "error" }),
        showSuccessSnackbar: (message) => enqueueSnackbar(message, { variant: "success" }),
        showDefaultSnackbar: (message) => enqueueSnackbar(message, { variant: "default" }),
        showWarningSnackbar: (message) => enqueueSnackbar(message, { variant: "warning" }),
        showInfoSnackbar: (message) => enqueueSnackbar(message, { variant: "info" }),
    }
}
