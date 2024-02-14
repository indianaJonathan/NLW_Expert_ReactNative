import { useState } from "react";
import { Text, View, TouchableOpacity, TouchableOpacityProps, TextInput } from "react-native";

type QuantitySelectProps = TouchableOpacityProps & {
    label: string;
    incrAmount: "integer" | "decimal" | string;
    onChange: (quanity: number) => void;
}

export function QuantitySelect ({ label, incrAmount, onChange, ...rest }: QuantitySelectProps) {
    const [value, setValue] = useState<number>(1.0);

    function increaseQuantity () {
        const amount = incrAmount === "integer" ? 1 : 0.1;
        setValue(value + amount);
    }

    function decreaseQuantity () {
        const amount = incrAmount === "integer" ? 1 : 0.1;
        if (value > 1) {
            setValue(value - amount);
        }
    }

    onChange(value);

    return (
        <TouchableOpacity
            className="flex-row gap-4 items-center mt-8"
            {...rest}
        >
            <View>
                <Text className="text-xl text-slate-200">
                    { label }
                </Text>
            </View>
            <View className="rounded-md py-4 bg-slate-800 items-center flex-row justify-evenly divide-x-2 divide-slate-500">
                <TouchableOpacity
                    className="px-4"
                    onPress={decreaseQuantity}
                >
                    <Text className="text-xl text-slate-500 text-center">
                        -
                    </Text>
                </TouchableOpacity>
                <View className="items-center justify-center px-4">
                    <Text className="text-2xl text-slate-400 text-center">
                        { incrAmount === "integer" ? value : value.toFixed(2).replace(".", ",") }
                    </Text>
                </View>
                <TouchableOpacity
                    className="px-4"
                    onPress={increaseQuantity}
                >
                    <Text className="text-xl text-slate-500">
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}