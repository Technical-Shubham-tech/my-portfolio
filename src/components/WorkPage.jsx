import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import { DarkTheme } from "./Themes";
import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import { Work } from "../data/WorkData";
import Card from "../subComponents/Card";
import { YinYang } from "./AllSvgs";
import BigTitle from "../subComponents/BigTitle";

const Main = styled.div`
  background-color: ${(props) => props.theme.body};
  height: calc(45vh * ${Work.length});
  position: relative;
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  height: 40vh;
  display: flex;
  color: #fff;
`;

const Rotate = styled.span`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;
  z-index: 1;
`;

const WorkPage = () => {
  const mainRef = useRef(null);
  const yinYangRef = useRef(null);

  useEffect(() => {
    let mainElement = mainRef.current;
    let yinYangElement = yinYangRef.current;
    const rotate = () => {
      mainElement.style.transform = `translateX(${-window.scrollY}px)`;

      yinYangElement.style.transform = `rotate(${-window.scrollY}deg)`;
    };

    window.addEventListener("scroll", rotate);
    return () => window.removeEventListener("scroll", rotate);
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Main>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Box ref={mainRef}>
          {Work.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </Box>

        <Rotate ref={yinYangRef}>
          <YinYang
            ref={yinYangRef}
            width={80}
            height={80}
            fill={DarkTheme.text}
          />
        </Rotate>

        <BigTitle text="WORK" top="10%" right="20%" />
      </Main>
    </ThemeProvider>
  );
};

export default WorkPage;
