import React from "react";
import { Container, Logo, SucessImg, Title } from "./styled";

import logoImg from "../../assets/logoDark.png";
import sucessImg from "../../assets/bomba_cortada_matrix.png";
import ButtonComponent from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";

export default function Disarmed() {
  const navigation = useNavigation();

  function handleNavToStart() {
    navigation.navigate("Start");
  }
  return (
    <Container>
      <Logo source={logoImg} style={{ resizeMode: "contain" }} />
      <Title>Parabens!{"\n"}você desarmou a Bomba</Title>
      <SucessImg source={sucessImg} style={{ resizeMode: "contain" }} />

      <ButtonComponent
        buttonText="Pagina inicial"
        handlePress={handleNavToStart}
      />
    </Container>
  );
}
