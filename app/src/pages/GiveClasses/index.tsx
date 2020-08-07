import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text } from 'react-native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import style from './style';
const GiveClasses = () => {
    const { goBack } = useNavigation();
    function handleNavigateBack(){
        goBack();
    }
    return(
        <View style={style.container}>
            <ImageBackground 
                resizeMode='contain' 
                style={style.content} 
                source={giveClassesBgImage}
            >
                <Text style={style.title}>
                    Quer ser um proffy
                </Text>
                <Text style={style.description}>
                    Para começar, você precisa se cadastrar como professor em nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton
             onPress={handleNavigateBack}
             style={style.okButton}>
                <Text style={style.okButtonText}>
                    Tudo bem
                </Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;