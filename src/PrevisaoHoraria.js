import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {
  Title,
  Card,
  Background,
  Body,
  MainWheather,
  CardText,
  InfoCard,
  InfoText,
  H1,
} from './components/StyledComponents';
import formatDescription from './util/formatDescription';
import { Grafico } from "./components/grafico";
import LinearGradient from "react-native-linear-gradient";

export default function Details({ route }) {
  console.log(route.params);
  const { dados, day, detalhes, diaSem } = route.params;

  let horaInicial = new Date(dados[0].dt * 1000);
  let previsao;
  let divisaoDia = 24 - horaInicial.getHours();

  if (day == 0) {
    previsao = dados.slice(0, divisaoDia);
  } else {
    previsao = dados.slice(divisaoDia, 24 + divisaoDia);
  }

  const graficoHora = previsao.map(data => {
    let hora = new Date(data.dt * 1000)
    return hora.getHours()
  })

  const graficoTemp = previsao.map(data => {
    return Math.round(data.temp);
  })

  const icones = previsao.map(data => {
    return `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  })

  const chuva = previsao.map(data => {
    return data.rain ? data.rain['1h'] : false
  })

  let nascer = new Date(detalhes.sunrise * 1000)
  nascer = `${nascer.getHours()}:${nascer.getMinutes()}`

  let pordoSol = new Date(detalhes.sunset * 1000)
  pordoSol = `${pordoSol.getHours()}:${pordoSol.getMinutes()}`

  return (
    <>
      <StatusBar barStyle="white-content" backgroundColor="#7dc8ff" />
      <Background>
        <LinearGradient
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
          colors={['#7dc8ff', '#5cbbff']}
          pointerEvents={'none'}
        />

        <MainWheather>
          <View width="20%">
            <Image
              source={detalhes.icon}
              style={{
                width: 65,
                height: 65,
              }}
            />
          </View>

          <Text style={{ fontSize: 16, color: '#FFF', width: "45%" }}>
            {diaSem + '\n' + detalhes.description}
          </Text>
          <Text style={{ fontSize: 24, color: '#FFF' }}>
            {detalhes.max}ºC / {detalhes.min}ºC
          </Text>
        </MainWheather>

        <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <View>
            <InfoCard>
              <InfoText>Vento</InfoText>
              <H1>{Math.round(detalhes.vento * 3.6)} km/h</H1>
            </InfoCard>
            <InfoCard>
              <InfoText>Nuvens</InfoText>
              <H1>{detalhes.nuvens}%</H1>
            </InfoCard>
            <InfoCard>
              <InfoText>Nascer do Sol</InfoText>
              <H1>{nascer}</H1>
            </InfoCard>
          </View>
          <View>
            <InfoCard>
              <InfoText>Umidade</InfoText>
              <H1>{detalhes.umidade}%</H1>
            </InfoCard>
            <InfoCard>
              <InfoText>Pressão</InfoText>
              <H1>{detalhes.pressao} hPa</H1>
            </InfoCard>
            <InfoCard>
              <InfoText>Por do Sol</InfoText>
              <H1>{pordoSol}</H1>
            </InfoCard>
          </View>
        </View>

        <ScrollView horizontal={true}>
          <Grafico temp={graficoTemp} horas={graficoHora} icons={icones} chuva={chuva} />
        </ScrollView>
      </Background>
    </>
  );
}