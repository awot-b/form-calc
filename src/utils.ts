import { isOperand } from "./components/TextInput";
import { Tag } from "./store/store";

export function isNumeric(value: number) {
    return typeof value === 'number' && !isNaN(value);
}

export function calculate(items: Tag[]) {
    let result = 0;
    let currentOperand = null;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.value && isNumeric(item.value)) {
            if (currentOperand === null) {
                result = item.value;
            } else {
                switch (currentOperand) {
                    case "-":
                        result -= item.value;
                        break;
                    case "+":
                        result += item.value;
                        break;
                    case "*":
                        result *= item.value;
                        break;
                    case "/":
                        if (item.value === 0) {
                            throw new Error("Division by zero error");
                        }
                        result /= item.value;
                        break;
                    default:
                        throw new Error("Unsupported operand: " + currentOperand);
                }
            }
        } else if (typeof item.content === 'string' && isOperand(item.content)) {
            currentOperand = item.content;
        }
    }

    return result;
}
