import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import style from './style';

interface Props {
    title: string;
    headerRight?: ReactNode;
}
const PageHeader: React.FC<Props> = ({ title, headerRight, children }) => {

    const { navigate } = useNavigation();
    function handleGoBack(){
        navigate('Landing');
    }
    return (
        <View style={style.container}>
            <View style={style.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode='contain'/>
                </BorderlessButton>

                <Image source={logoImg} resizeMode='contain'/>
            </View>

            <View style={style.header}>
              <Text style={style.title}>{title}</Text>
              {headerRight}
            </View>

            { children }
        </View>
    );
}
export default PageHeader;
