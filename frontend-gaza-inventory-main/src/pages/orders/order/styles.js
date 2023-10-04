import styled from "styled-components";


export const Main = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  font-family: 'Poppins';
`;

export const Subtitle = styled.button`
font-weight: 500;
font-size: 18px;
line-height: 27px;
color: #283540;
`;

export const FlexC = styled.div`
  display:flex;
  flex-direction: column;
`;

export const Title = styled.span`
font-weight: 600;
font-size: 22px;
line-height: 33px;
color: #283540;
`;
export const Content = styled.div`
    width: auto;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 0.7px 2.5px 1px rgb(0 0 0 / 5%);
    border-radius: 16px;
    padding: 50px 20px;
    margin: 10% 28px 0 28px;
    max-width: 1130px;
`;

export const BackgroundContainer = styled.div`
  background: #EFF3F6;
  width: 100%;
  height: 100vh;
`;
