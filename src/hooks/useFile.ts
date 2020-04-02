import { Dispatch, SetStateAction, useState } from "react";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { dataURLtoFile, getExtension, getUnsafeExtension } from "../utils";

export interface IFileServiceParams {
    maxFileSize: number;
    whiteList: string[];
}

export function useFile(
    params: IFileServiceParams,
): {
    file?: File;
    src?: string;
    setSrc: Dispatch<SetStateAction<string | undefined>>
    error?: string;
    setError: Dispatch<SetStateAction<string | undefined>>
    loadFile: (file: File) => Promise<void>;
    deleteFile: () => void;
} {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [src, setSrc] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const loadFile = async (f: File) => {
        if (!!(await getError(f))) {
            setError(await getError(f));
            return;
        }
        setError(undefined);
        const reader = new FileReader();
        reader.readAsDataURL(f);
        fromEvent(reader, "loadend").subscribe(async () => {
            try {
                setSrc(reader.result as string);
                setFile(dataURLtoFile(reader.result as string, f.name));
            } catch (error) {
                // Nothing here
            }
        });
    };

    const getError = async (file: File): Promise<string | undefined> => {
        if (file.size > params.maxFileSize) {
            return `Размер файла не должен превышать ${params.maxFileSize / (1024 * 1024)}МБ !`;
        }
        const ext = await new Promise((resolve: (ext: string) => void) =>
            getExtension(resolve, file),
        );
        if (params.whiteList.indexOf(ext) < 0) {
            return `Файл этого типа не может быть загружен. Разрешенные расширения: ${params.whiteList.join(", ")}`;
        }
        if (getUnsafeExtension(file) !== ext) {
            return "Тип файла не соответствует его расширению. Пожалуйста, повторите попытку.";
        }
        return undefined;
    };

    const deleteFile = () => {
        setSrc(undefined);
        setFile(undefined);
        setError(undefined);
    };

    return { file, src, error, loadFile, deleteFile, setSrc, setError };
}
