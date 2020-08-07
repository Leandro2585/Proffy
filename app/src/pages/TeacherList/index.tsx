import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { View, Text, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import style from './style';

const TeacherList = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favotites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    useFocusEffect(
      React.useCallback(() => {
        loadFavorites();
      }, []);
    );
    function loadFavorites {
      AsyncStorage.getItem('favorites').then(response => {
        if(response){
          const favoritedTeachers = JSON.parse(response);
          const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => (teacher.id))
          setFavorites(favoritedTeachersIds);
        }
      });
    }
    function handleToggleFilterVisible(){
      setIsFilterVisible(!isFilterVisible);
    }
    async function handleFilterSubmit(){
      loadFavorites();
      const response = await api.get('classes',{
          params: {
            subject,
            week_day,
            time
          }
      });
      setIsFilterVisible(false);
      setTeachers(response.data);
    }
    return (
        <View style={style.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
              <BorderlessButton onPress={handleToggleFilterVisible}>
                <Feather name="filter" size={20} color="#fff"/>
              </BorderlessButton>
            )}>
            { isFilterVisible && (
              <View style={style.searchForm}>
                <Text style={style.label}>Matéria</Text>
                <TextInput
                  value={subject}
                  onChangeText={text => setSubject(text)}
                  placeholderTextColor="#c1bccc"
                  style={style.input}
                  placeholder="Qual a matéria"
                />
                <View style={style.inputGroup}>

                  <View style={style.inputBlock}>
                    <Text style={style.label}>Dia da semana</Text>
                    <TextInput
                      value={week_day}
                      onChangeText={text => setWeekDay(text)}
                      placeholderTextColor="#c1bccc"
                      style={style.input}
                      placeholder="Qual o dia?"
                    />
                  </View>

                  <View style={style.inputBlock}>
                    <Text style={style.label}>Horário</Text>
                    <TextInput
                      value={time}
                      onChangeText={text => setTime(text)}
                      placeholderTextColor="#c1bccc"
                      style={style.input}
                      placeholder="Qual horário?"
                    />
                  </View>

                </View>

                <RectButton onPress={handleFilterSubmit} style={style.submitButton}>
                  <Text style={style.submitButtonText}>Filtrar</Text>
                </RectButton>
              </View>
            )}

            </PageHeader>

            <ScrollView
              style={style.TeacherList}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
            >
            {teachers.map((teacher: Teacher) => {
              return (
                <TeacherItem
                  key={teacher.id}
                  teacher={teacher}
                  favorited={favorites.includes(teacher.id)}
                />
              );
            })}
            </ScrollView>

        </View>
    );
}
export default TeacherList;
