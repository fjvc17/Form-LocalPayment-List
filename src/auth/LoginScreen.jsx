import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/login.css';
import { Link } from 'react-router-dom';


const LoginScreen = ({ loginData }) => {
  const history = useHistory()
  const [error, setError] = useState(false)

  
  const onFinish = (values) => {
    const shouldLogIn = loginData(values.username, values.password)
    if (shouldLogIn) {
      return history.replace("/home")
    }
      setTimeout(() => {
        setError(false)
      }, 4000);
    return setError(true)
  };


  return (
    <div className="container-login">
      
      <div>
        {error && <Alert message='Usuario no Registrado' type="error" showIcon /> }
      </div>

        

      <Form
        name="normal_login"
        className="login-form"
        
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa Nombre de Usuario!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" name="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa Contraseña!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
            name='pass'

          />
        </Form.Item>
        <Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

        </Form.Item>

        <Form.Item>
          <Button type="primary" className="login-form-button" htmlType="submit">
            Log in
          </Button>

          <div className="link">
            <Link to="/auth/register">Registrate ahora!</Link>
          </div>
        </Form.Item>
      </Form>
      
    </div>
  );

}

export default LoginScreen
