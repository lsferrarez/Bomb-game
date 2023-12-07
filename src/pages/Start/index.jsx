import React from "react";
import { Container, Logo, Rules, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "../../components/Buttons";

export default function Start() {
  const navigation = useNavigation();

  function handleNavToPlayAlone() {
    navigation.navigate("PlayAlone");
  }

  function handleNavToPlayTogether() {
    navigation.navigate("PlayTogether");
  }

  function handleNavToRules() {
    navigation.navigate("Rules");
  }

  return (
    <Container>
      <Logo
        source={require("../../assets/logoDark.png")}
        style={{ resizeMode: "contain" }}
      />
      <Title>Bem vindo ao {"\n"} Bomb Game</Title>
      <SubTitle>Escolha um modo de Jogo</SubTitle>
      <ButtonComponent
        buttonText={"jogar Solo"}
        handlePress={handleNavToPlayAlone}
      />
      <ButtonComponent
        buttonText={"jogar em Dupla"}
        handlePress={handleNavToPlayTogether}
      />
      <Rules onPress={handleNavToRules}>Ver as regras do Jogo</Rules>
    </Container>
  );
}
