import { Menu} from 'antd';
export const NavigationMenu = () => {
  const items = [
    {
      key: '1',
      label: 'Home',
      url: '/',
    },
  ]
  return (
    <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
  );
};
