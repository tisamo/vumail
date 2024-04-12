export interface FormInput{
    name: string;
    type: string;
    required: boolean;
    value: number | string | Date;
    editorIndex?: number;
}