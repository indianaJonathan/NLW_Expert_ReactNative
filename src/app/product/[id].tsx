import { View, Text, Image } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation, Redirect } from 'expo-router'

import { ProductCartProps, useCartStore } from '@/stores/cart-store';

import { Button } from '@/components/button';

import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/formatCurrency';
import { LinkButton } from '@/components/link-button';
import { QuantitySelect } from '@/components/quantity-select';
import { useState } from 'react';

export default function Product () {
    const cartStore = useCartStore();
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();

    const [quantity, setQuantity] = useState(1);

    const product = PRODUCTS.find((prod) => prod.id === id);

    function handleAddToCart() {
        if (product) {
            const newProduct: ProductCartProps = {...product, quantity}
            cartStore.add(newProduct);
            navigation.goBack();
        }
    }

    function handleQuantityChange(selectedQuantity: number) {
        setQuantity(selectedQuantity);
    }

    if (!product) {
        return <Redirect href="/"/>
    }

    return (
        <View className="flex-1">
            <Image
                source={ product.cover }
                className="w-full h-52" 
                resizeMode="cover"
            />

            <View className="p-5 mt-8 flex-1">
                <View className="flex-row justify-between items center mb-4">
                    <Text className="text-white text-3xl font-header">
                        { product.title }
                    </Text>
                    <Text className="text-lime-400 text-2xl font-header my-2">
                        { formatCurrency(product.price) }
                    </Text>
                </View>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    { product.description }
                </Text>

                { product.ingredients.map((ingredient) => (
                    <Text
                        key={ingredient}
                        className="text-slate-400 font-body text-base leading-6"
                    >
                        {"\u2022"} { ingredient }
                    </Text>
                )) }
                <QuantitySelect label="Quantidade:" initialValue={1} incrAmount="integer" onChange={handleQuantityChange}/>
            </View>
            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao pedido
                    </Button.Text>
                </Button>

                <LinkButton title="Voltar ao cardapio" href="/" />
            </View>
        </View>
    );
}