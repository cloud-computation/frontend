export interface IOption {
    value: string | number;
    label?: string;

    handler?(): void;
}
