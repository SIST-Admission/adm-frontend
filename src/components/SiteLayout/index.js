import { Layout } from 'antd';
import './index.css';
import { Navbar,Text } from "@nextui-org/react";
import sistLogo from './logo.jpg'

const { Footer } = Layout;

const SiteLayout = ({ children }) => {

  return (
    <>
      <Navbar isBordered variant="sticky" size={87}>
        <Navbar.Brand>
          <img style={{
            width: "35px",
            height: "35px",
          }} src={sistLogo} alt="logo" />
          <Text b color="inherit" style={{
            fontFamily: "helvetica",
            marginLeft: "10px",
          }}>
            Sikkim Institute of Science and Technology<br/>
            <span style={{
              fontSize: "12px",
              color: "gray",
            }}>Admission Portal | 2023 Admissions</span>
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight" style={{
          fontFamily: "helvetica",
        }}>
          <Navbar.Link href="/" isActive>Home</Navbar.Link>
          <Navbar.Link href="/" >Prospectus</Navbar.Link>
          <Navbar.Link href="/" >Contact Us</Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <main style={{
        minHeight: "calc(100vh - 64px)",
      }}>
        {children}
      </main>
      <Footer style={{ textAlign: 'center' }}>SIST ©2023 Created by SIST</Footer>
    </>
  );
}

export default SiteLayout;