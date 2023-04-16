import { Layout } from 'antd';
import './index.css';
import { Navbar,Text } from "@nextui-org/react";

const { Footer } = Layout;

const SiteLayout = ({ children }) => {

  return (
    <>
      <Navbar isBordered variant="sticky" size={87}>
        <Navbar.Brand>
          <img style={{
            width: "35px",
            height: "35px",
          }} src="https://scontent.frdp1-1.fna.fbcdn.net/v/t1.6435-9/59440341_453576372045077_104671922121342976_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4bdSXXYBTUkAX9hnMCy&_nc_ht=scontent.frdp1-1.fna&oh=00_AfB_UfiCmaqsjfgx-KS5kHETygEEjD2VBpC_Ae2kxFvQhg&oe=646353C4" alt="logo" />
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