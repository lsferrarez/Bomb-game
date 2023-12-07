import React, { useState } from "react";
import { BombMessage, Container, ScrollContainer, Title } from "./styled";
import { useNavigation } from "@react-navigation/native";

import InputTimer from "../../components/playTogether/inputTime";
import TipInput from "../../components/playTogether/TipInput";
import InputPassword from "../../components/playTogether/inputPassword";
import ButtonComponent from "../../components/Buttons";
import BombService from "../../services/BombApp";

export default function PlayTogether() {
  const navigation = useNavigation();
  const [pin, setPin] = useState(["", "", ""]);
  const [started, setStarted] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [message, setMessage] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [intervalid, setIntervalid] = useState();

  function handleNavToStart() {
    navigation.navigate("Start");
  }

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

  function handleStartGame() {
    BombService.bombActivationTogether({
      question,
      pin,
      hours,
      minutes,
      seconds,
      setMessage,
      setStarted,
      setPin,
      handleStartBomb,
      setAnswer,
    });
  }

  function handleDisarmBomb() {
    BombService.bombDisarmTogether({
      pin,
      answer,
      setStarted,
      intervalid,
      setPin,
      setAnswer,
      navigation,
    });
  }

  function handleGiveUpGame() {
    BombService.giveUpGame({ intervalid, navigation });
  }

  return (
    <ScrollContainer>
      <Container>
        <Title>Bomb Game Dupla</Title>
        <InputTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
        {message ? <BombMessage>{message ? message : null}</BombMessage> : null}

        <TipInput
          started={started}
          question={question}
          setQuestion={setQuestion}
        />
        <InputPassword pin={pin} setPin={setPin} />
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
              handlePress={handleDisarmBomb}
            />

            <ButtonComponent
              buttonText="Desistir"
              handlePress={handleGiveUpGame}
            />
          </>
        )}
      </Container>
    </ScrollContainer>
  );
}
