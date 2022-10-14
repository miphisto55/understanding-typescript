
// Validation
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// Utility function
export function validate(input: Validatable) {
    let isValid = true;

    if (input.required) {
        isValid = isValid && (input.value.toString().trim().length !== 0);
    }
    if ((input.minLength != null) && (typeof input.value === 'string')) {
        isValid = isValid && (input.value.trim().length >= input.minLength);
    }
    if (input.maxLength && typeof input.value === 'string') {
        isValid = isValid && (input.value.trim().length <= input.maxLength);
    }
    if (input.min && typeof input.value === 'number') {
        isValid = isValid && (input.value > input.min);
    }
    if (input.max && typeof input.value === 'number') {
        isValid = isValid && (input.value <= input.max);
    }
    return isValid;
}