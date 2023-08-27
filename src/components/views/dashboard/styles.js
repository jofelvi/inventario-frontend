import styled from "styled-components";

export const Main = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  font-family: 'Poppins';
  height: 100%;
  min-height: 100vh;
`;

export const Content = styled.div`
    width: auto;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 0.7px 2.5px 1px rgb(0 0 0 / 5%);
    border-radius: 16px;
    padding: 50px 20px;
    margin: 3% 28px 0 28px;
    max-width: 1130px;
`;

export const BackgroundContainer = styled.div`
  background: #EFF3F6;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 42px 0 60px;
`;

export const WelcomeTitle = styled.div`
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 33px;
color: #023E8A;
`;

export const Title = styled.span`
font-weight: 600;
font-size: 22px;
line-height: 33px;
color: #283540;
`;

export const FlexC = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
    margin-left: 32px;

`;

export const SmallCard = styled.div`
max-width: 200px;
min-width: 20%;
padding: 12px ;
background: #E5F6FF;
border-radius: 30px;
`;


export const CardsContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 16px;
    gap: 16px;
    display: flex;
    flex-direction: row;
    max-width: 700px;

`;