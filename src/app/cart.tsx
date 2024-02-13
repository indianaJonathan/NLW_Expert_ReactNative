import { useState } from 'react'
import { Alert, ScrollView, Text, View, Linking } from 'react-native'
import { useNavigation } from 'expo-router'

import { Feather } from '@expo/vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { LinkButton } from '@/components/link-button'

import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/formatCurrency'
import { Input } from '@/components/input'

const PHONE_NUMBER = "5541996831633"

export default function Cart() {
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const [address, setAddress] = useState("");
    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

    function handleProductRemove(product: ProductCartProps) {
        Alert.alert("Remover produto", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar"
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ]);
    }

    function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe o endereço de entrega");
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("");

        const message = `
            🍔🍔 NOVO PEDIDO 🍔🍔
            \n 🏍️ Entregar em: ${address.toLocaleUpperCase()}
            ${products}
            \n 💵 **Valor total:** ${total}
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

        cartStore.clear();
        navigation.goBack();
    }

    return (
        <View className="flex-1 pt-8 mb-8">
            <Header title="Seu carrinho" />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                        { cartStore.products.length > 0 ? (
                            <View className="pb-4 items-center border-b border-slate-700 gap-4">
                                { cartStore.products.map((product) => (
                                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>
                                )) }
                                <Input
                                    placeholder="Informe o endereço de entrega com rua, bairro, cep, número e complemento"
                                    value={address}
                                    onChangeText={setAddress}
                                    blurOnSubmit={true}
                                    onSubmitEditing={handleOrder}
                                    returnKeyType="next"
                                />
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho está vazio
                            </Text>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            <View className="flex-col gap-3 px-4">
                <View className="flex-row gap-2 items-center mt-5 mb-4">
                    <Text className="text-white text-xl font-subtitle">
                        Total:
                    </Text>
                    <Text className="text-lime-400 text-2xl font-header">
                        { total }
                    </Text>
                </View>
                { cartStore.products.length > 0 &&
                    <Button onPress={handleOrder}>
                        <Button.Text>
                            <Text>
                                Enviar pedido
                            </Text>
                        </Button.Text>
                        <Button.Icon>
                            <Feather name="arrow-right-circle" size={20}/>
                        </Button.Icon>
                    </Button>
                }
                <LinkButton href="/" title="Voltar ao cardápio"/>
            </View>
        </View>
    );
}