import React, { createRef, useState } from 'react';
import {useHistory} from 'react-router-dom'
import 'antd/dist/antd.css';
import '../styles/register.css';
import { Form, Input, Cascader, Select, Button, DatePicker, Radio, } from 'antd';
import { Link } from 'react-router-dom';
import { disease, residences } from '../helpers/helpers';


const { Option } = Select;
const { Group } = Radio;


const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="54">+54</Option>
      <Option value="56">+56</Option>
      <Option value="1">+1</Option>
    </Select>
  </Form.Item>
);

const handleDate = (date, dateString) => {
  console.log(date, dateString)
}

const handleValue = (value) => {
  console.log(value)
}


const RegisterScreen = ({registerUser}) => {
  
  const history = useHistory();

  const [value, setValue] = useState(1);

  const [form] = Form.useForm();

  const formRef = createRef();

  const deleteFields = () => {
    formRef.current.resetFields();
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 10,
      },
    },
    wrapperCol: {
      xs: {
        span: 4,
      },
      sm: {
        span: 20,
      },
    }
  };

  const handleFinish = (values) => {
    registerUser(values);
    history.replace("/auth/login")
    console.log('Formulario completo: ', values);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }


  return (
    <div className="container-register">
      <Form 
        form={form}
        name="register"
        onFinish={handleFinish}
        ref={formRef}
        {...formItemLayout}
        initialValues={{
          prefix: '54'
        }}
        scrollToFirstError
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email no valido!',
            },
            {
              required: true,
              message: 'Por favor ingresar Email!',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Usuario"
          name="usuario"
          rules={[{
            required: true,
            message: "Por favor ingrese Nombre de Usuario"
          }]}
        >
          <Input placeholder="Nombre de Usuario" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contraseña"
          rules={[{
            required: true,
            message: "Por favor ingrese Contraseña"
          }]}
          hasFeedback
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          label="Confirmar Contraseña"
          name="confirmar"
          dependencies={['contraseña']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confirmar su Contraseña!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('contraseña') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Las contraseñas que ingresa no Coinciden!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>


        <Form.Item
          label="Nombre y Apellido"
          name="nombre"
          rules={[{
            required: true,
            message: "Por favor ingrese Nombre"
          }]}
        >
          <Input placeholder="Nombre y Apellido" />
        </Form.Item>

        <Form.Item
          label="Sexo"
          name="sexo"
        >
          <Group onChange={handleChange} value={value} name="radioButtom" initialValues={1}>
            <Radio value={1}>Hombre</Radio>
            <Radio value={2}>Mujer</Radio>
            <Radio value={3}>Otro</Radio>
          </Group>
        </Form.Item>

        <Form.Item
          label="Fecha de Nacimiento"
          name="fecha de nacimiento"
          rules={[{
            required: true,
            message: "Por favor ingrese Fecha de Nacimiento"
          }]}
        >
          <DatePicker onChange={handleDate} placeholder="Fecha de Nacimiento" />
        </Form.Item>

        <Form.Item
          name="numero"
          label="Numero Telefonico"
          rules={[

            {
              required: 'true',
              message: 'Por favor introducir numero telefonico',
            }
            
          ]}
        >
          <Input
            placeholder="Numero"
            addonBefore={prefixSelector}
            maxLength={10}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="DNI"
          name="dni"
          maxLength={10}
          rules={[

            {
            required: true,
            message: "ingresar DNI"
            }

          ]}
        >
          <Input placeholder="DNI" />
        </Form.Item>

        <Form.Item
          label="Localidad"
          name="Localidad"
          rules={[{
            required: true,
            message: 'Ingresar Localidad'
          }]}
        >
          <Cascader options={residences} onChange={handleValue} placeholder="Localidad" />
        </Form.Item>

        <Form.Item
          label="Tipo de Enfermedad"
          name="tipo de enfermedad"
          rules={[{
            required: true,
            message: 'Ingresar Tipo de Enfermedad'
          }]}
        >
          <Cascader options={disease} onChange={handleValue} placeholder="Enfermedad" />
        </Form.Item>

        <div className="btn-register">
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button htmlType="button" onClick={deleteFields}>
            Borrar campos
          </Button>
        </div>

        <div className="link">
          <Link to="/auth/login">
            Ya tienes cuenta?
          </Link>  
        </div>  

      </Form>
    </div>
  );
};


export default RegisterScreen
