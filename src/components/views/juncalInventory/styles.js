import styled from "styled-components";

export const Main = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
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

export const FlexR = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
    justify-content: space-between;
    padding-right: 40px;
`;

export const UserContainer = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
`;

export const UserLabel = styled.div`
  font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
color: #000000;
padding-left: 10px;

`;
