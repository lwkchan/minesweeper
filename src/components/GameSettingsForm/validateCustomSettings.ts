import { CustomGameConfigForm } from "./CustomConfigForm";

export const validateCustomSettings = (customGameConfig: CustomGameConfigForm): CustomGameConfigForm | undefined => {
    // validate form
    let errors = {} as CustomGameConfigForm;
    Object.keys(customGameConfig).forEach((k) => {
        const key = k as keyof CustomGameConfigForm;
        const value = customGameConfig[key];

        if (!/^-?\d+$/.test(value)) {
            // is not number
            errors[key] = 'Please enter a valid number';
            return;
        }

        if (key === 'mines') {
            const maxNumberOfMines =
                parseInt(customGameConfig.width) *
                parseInt(customGameConfig.height);
            const actualMines = parseInt(customGameConfig[key]);
            if (actualMines > maxNumberOfMines) {
                errors[key] =
                    'The number of mines cannot exceed the width * height of the grid';
            }
        }
    });

    if (Object.values(errors).length > 0) {
        // set errors
        return errors
    }
}