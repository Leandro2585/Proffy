import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import LandingImg from '../../assets/images/landing.png';
import api from '../../services/api';
import style from './style';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
const Landing = () => {

    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(() => {
      api.get('connections').then(res => {
        const { total } = res.data;
        setTotalConnections(total);
      });
    }, []);

    const {navigate} = useNavigation();
    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses');
    }
    function handleNavigateToStudyPage(){
        navigate('Study')
    }
    return (
        <View style={style.container}>

             <Image style={style.banner} source={LandingImg}/>
             <Text style={style.title}>
               Seja bem-vindo{'\n'}
               <Text style={style.titleBold}>O que deseja fazer.</Text>
             </Text>

             <View style={style.buttonsContainer}>

                <RectButton
                    onPress={handleNavigateToStudyPage}
                    style={[style.button, style.buttonPrimary]}>
                    <Image source={ studyIcon }/>
                    <Text style={style.buttonText}>
                        Estudar
                    </Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToGiveClassesPage}
                    style={[style.button, style.buttonSecundary]}
                >
                    <Image source={ giveClassesIcon}/>
                    <Text style={style.buttonText}>
                        Dar aulas
                    </Text>

                </RectButton>

             </View>

             <Text style={style.totalConnections}>
                 Total de {totalConnections} conexões já realizadas {' '}
                 <Image source={heartIcon}/>
             </Text>

        </View>
    );
}
export default Landing;
