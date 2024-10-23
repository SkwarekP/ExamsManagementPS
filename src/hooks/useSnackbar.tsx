import { useEffect, useState } from "react";
import { Snackbar } from "../ui/snackbar/snackbar";
import ReactDOM from "react-dom";

type Severities = "error" | "warning" | "success"
interface SnackbarOptions {
    severity: Severities,
    title?: string,
    message: string
}

export const useSnackbar = () => {
    const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions | null>(null);


    const show = (options: SnackbarOptions) => {
        setSnackbarOptions(options);
        setTimeout(() => {
            setSnackbarOptions(null)
        }, 2500);
    }

    const renderSnackbar = (options: SnackbarOptions) => {
        const snackbarDiv = document.createElement('div');
        ReactDOM.render(
            <Snackbar
                severity={options.severity}
                message={options.message}
                title={options?.title}
            />,
            snackbarDiv
        );

        return snackbarDiv;
    };

    useEffect(() => {
        if (snackbarOptions) {
            document.body.appendChild(renderSnackbar(snackbarOptions));
        }
    }, [snackbarOptions])

    return {
        show
    }
}