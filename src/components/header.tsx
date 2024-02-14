import { Image, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

type HeaderProps = {
    title: string;
    cartQuantityItems?: number;
    icon?: "shopping-cart" | "home";
}

export function Header({ title, cartQuantityItems = 0, icon }: HeaderProps) {
    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image
                    source={require("@/assets/logo.png")}
                    className="h-6 w-32"
                />
                <View className="flex-row gap-4">
                    {icon && <Feather name={icon} size={20} color={colors.slate[400]}/>}
                    <Text className="text-white text-xl font-header mt-2">
                        { title }
                    </Text>
                </View>
            </View>
            { cartQuantityItems > 0 &&
                <Link href="/cart" asChild>
                    <TouchableOpacity className="relative" activeOpacity={0.7}>
                        <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                            <Text className="text-slate-900 font-bold text-xs">
                                { cartQuantityItems.toFixed(0) }
                            </Text>
                        </View>
                        <Feather name='shopping-bag' color={colors.white} size={24}/>
                    </TouchableOpacity>
                </Link>
            }
        </View>
    );
}