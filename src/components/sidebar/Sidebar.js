import React from 'react'
import { useAuth } from '@hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {SidebarContainer, Menu, ImageContainer, ImageLogo} from './styles';
import { LogoutOutlined, ShopOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { DashboardSVG, InventorySVG, OrdersSVG, Logo } from '../../../public/svg/icons'


function Sidebar() {
  const router = useRouter();
  const auth = useAuth();

  return (
          <SidebarContainer>
            <ImageContainer>
           <Logo />
            </ImageContainer>
              <Menu
              onClick={({key}) =>{
                key === "logout" ?
                auth.logout() : router.push(key)
              }
            }
              mode='inline'
              items={[
                { label: "Dashboard", key: "/dashboard", icon: <DashboardSVG />},
                { label: "Crear Sucursal", key: "/store", icon: <DashboardSVG />},
                { label: "Inventario",
                  key: "/inventario",
                  icon: <InventorySVG />,
                  children: [
                  { label: "Almacen", key: "/inventory/mainInventory"},
                  { label: "Sucursal Miranda", key: "/inventory/miranda"},
                  { label: "Sucursal Juncal", key: "/inventory/juncal"},
                ],
                },
                { label: "Productos",
                key: "/products",
                icon: <PlusSquareOutlined />,
                children: [
                { label: "Lista de Productos", key: "/products"},
                { label: "Consumo", key: "/products/usage"},
                { label: "Materiales", key: "/products/materials"},
              ],
              },
                { label: "Ordenes", key: "/orders", icon: <OrdersSVG />},
                { label: "Entradas", key: "/entries", icon: <ShopOutlined />},
                { label: "Logout", key: "logout", icon: <LogoutOutlined />},
              ]}
              
              >
              </Menu>
          </SidebarContainer>
  )
};

export default Sidebar;