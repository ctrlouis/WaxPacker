import { useQuasar } from 'quasar';

type ErrorWithMessage = {
    message: string,
}

export function useError() {

    const $q = useQuasar();

    function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
        return (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof (error as Record<string, unknown>).message === 'string'
        );
    }
      
    function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
        if (isErrorWithMessage(maybeError)) {
            return maybeError;
        }
        try {
            return new Error(JSON.stringify(maybeError));
        } catch {
            return new Error(String(maybeError));
        }
    }

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }
      
    const reportError = ({message}: {message: string}) => {
        console.error(message);
        $q.dialog({
            color: 'red',
            dark: true,
            message: message,
        });
    }

    return {
        getErrorMessage,
        reportError,
    }
}