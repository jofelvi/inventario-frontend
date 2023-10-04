import styled from "styled-components";
import { Table as TableBase, Space as SpaceBase } from "antd";

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


export const Main = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  font-family: 'Poppins';
  height: 100%;
  min-height: 100vh;
`;

export const Subtitle = styled.button`
font-weight: 500;
font-size: 18px;
line-height: 27px;
color: #283540;
margin-top: 50px;
`;

export const FlexC = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
    margin-left: 32px;
    
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

export const Table = styled(TableBase)`
.ant-table-pagination.ant-pagination {
    margin: 40px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

export const Space = styled(SpaceBase)`
`;