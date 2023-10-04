import styled from "styled-components";
import { Menu as MenuBase, Space as SpaceBase, } from "antd";

export const SidebarContainer = styled.div`
  background: #283540;
  max-width: 249px;
  width: 100%;
  font-family: 'Poppins';

`;

export const ImageContainer = styled.div`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 30px 0 40px;

`


export const Menu = styled(MenuBase)`
background: transparent;
border-right: none;
color: #CCCCCC;
font-size: 16px;
.ant-menu-item-icon{
  height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.ant-menu-item-icon svg{
  height: 23px;
    width: 23px;
}
.ant-menu-item{
  display: flex;
}

.ant-menu-item:hover, .ant-menu-item-active{
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.104) 0%, rgba(220, 234, 243, 0.2) 0.01%, rgba(207, 219, 252, 0.044) 94.22%);
}

.ant-menu-title-content:hover, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-active:hover{
  color: white;
  }
  .ant-menu-submenu-expand-icon, .ant-menu-submenu-arrow{
    color: #CCCCCC;
  }
  .ant-menu-submenu-title:hover svg path, .ant-menu-submenu-active svg path,
  .ant-menu-item:hover svg path{
    fill: #60C4F2;
    fill-opacity: 1;
  }

  .ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover{
    color: white;
  }
   .ant-menu-submenu-active{
    color: white;
  }

.ant-menu-title-content {
  margin-left: 16px;
}
.ant-menu-sub {
  background: transparent;
}

.ant-menu-sub .ant-menu-item {
  color: #CCCCCC;
  font-size: 14px;
}

.ant-menu-submenu .ant-menu-sub .ant-menu-item .ant-menu-title-content:hover{
  color: #60C4F2;
}
`;



export const Space = styled(SpaceBase)`
`;