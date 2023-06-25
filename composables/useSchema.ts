import * as yup from "yup";

export const HexSchema = () => {
    return yup.object({
        hex: yup
            .string()
            .matches(/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, () => regex())
            .required(() => required()),
    });
};

let regex = () => "Не соответсвует HEX";
let required = () => "Это обязательное поле";

