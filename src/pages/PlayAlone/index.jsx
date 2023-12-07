import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";

import { findFocusedRoute, useNavigation } from "@react-navigation/native";

import {
  Container,
  ScrollContainer,
  TextTimer,
  Timer,
  TipContainer,
  TipText,
  TipTitle,
  Title,
} from "./styled";

import bombImg from "../../assets/bomba.png";
import PasswordInput from "../../components/Passwordinput";
import ButtonComponent from "../../components/Buttons";
import BombService from "../../services/BombApp";
import api from "../../services/api/api";

export default function PlayAlone() {
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [pin, setPin] = useState(["", "", ""]);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("15");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [intervalid, setIntervalid] = useState();

  function handleStartGame() {
    BombService.bombStarGame({ setStarted, hours, minutes, seconds });
  }

  function handleDesarmBomb() {
    BombService.disarBomb({
      setStarted,
      answer,
      navigation,
      pin,
      setPin,
      intervalid,
    });
  }

  function handleGiveUp() {
    BombService.giveUpGame({ intervalid, navigation });
  }

  async function fetchQuestion() {
    const randomNumber = Math.floor(Math.random() * 6 + 1);

    const { data } = await api.get(`questions/${randomNumber}`);

    setQuestion(data?.pergunta);
    setAnswer(data?.resp);
  }
  useEffect(() => {
    fetchQuestion();
  }, []);

  function handleStartBomb() {
    const diffTime = BombService.getDiffTime({ hours, minutes, seconds });

    BombService.startCountDown({
      setSeconds,
      setMinutes,
      setHours,
      setStarted,
      diffTime,
      setIntervalid,
      intervalid,
      navigation,
    });
  }

  function handleNavToStart() {
    navigation.navigate("Start");
  }

  useEffect(() => {
    if (started) {
      handleStartBomb();
    }
  }, [started]);

  return (
    <ScrollContainer>
      <Container>
        <Title>Bomb Game Solo</Title>
        <ImageBackground
          source={bombImg}
          resizeMode="cover"
          style={{
            minHeight: 130,
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Timer>
            <TextTimer>
              {hours} : {minutes} : {seconds}
            </TextTimer>
          </Timer>
        </ImageBackground>

        {!started ? null : (
          <TipContainer>
            <TipTitle>Sua Dica:</TipTitle>
            <TipText>{question}</TipText>
            <TipText>{answer}</TipText>
          </TipContainer>
        )}
        <PasswordInput pin={pin} setPin={setPin} started={started} />
        {!started ? (
          <>
            <ButtonComponent
              buttonText="iniciar"
              handlePress={handleStartGame}
            />

            <ButtonComponent
              buttonText="Pagina inicial"
              handlePress={handleNavToStart}
            />
          </>
        ) : (
          <>
            <ButtonComponent
              buttonText="Desarmar"
              handlePress={handleDesarmBomb}
            />
            <ButtonComponent buttonText="Desistir" handlePress={handleGiveUp} />
          </>
        )}
      </Container>
    </ScrollContainer>
  );
}
