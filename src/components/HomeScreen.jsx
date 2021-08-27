import { Button, Form, Input, Radio } from 'antd';
import React, { createRef, useEffect, useState } from 'react';
import '../styles/home.css';
import 'antd/dist/antd.css';
import axios from "axios";
import { Prescription } from '../components/Prescription';

const { Group } = Radio;


const HomeScreen = () => {

  const [prescription, setPrescription] = useState(false)

  const [foodData, setFoodData] = useState([])


  const [data, setData] = useState(null);

  const [form] = Form.useForm();

  const formRef = createRef();

  const deleteFields = () => {
    setPrescription(false);
    setData([]);
    formRef.current.resetFields();
  }


  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      setData(data)
    }
    getData();

  }, [prescription]);


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
    setFoodData(foodData.concat({...values, date: new Date().toISOString()}) )
    console.log('Formulario completo: ', values);
  };

  const showPrescription = () => {
    setPrescription(true)
  }



  return (
    <div className="box-container">
      <div className="container-home">
        <Form
          form={form}
          name="formulario"
          onFinish={handleFinish}
          ref={formRef}
          {...formItemLayout}
        >
          <h2>Completa el formulario para determinar tu Tratamiento</h2>
          <hr />
          <div className="form-first_column">

            <Form.Item
              label="Tipo de Comida"
              name="comida"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese Tipo de Comida'
                }
              ]}
            >
              <Group>
                <Radio value={1}>Desayuno</Radio>
                <Radio value={2}>Almuerzo</Radio>
                <Radio value={3}>Merienda</Radio>
                <Radio value={4}>Cena</Radio>
              </Group>
            </Form.Item>

            <Form.Item
              label="Comida Principal"
              name="principal"
              initialValue={""}
              rules={[
                {
                  required: true,
                  message: 'Ingrese comida principal'
                }
              ]}
            >
              <Input placeholder="Comida principal" />
            </Form.Item>

            <Form.Item
              label="Comida Secundaria"
              name="secundaria"
              rules={[
                {
                  required: true,
                  message: 'Ingrese comida secundaria'
                }
              ]}
            >
              <Input placeholder="Comida Secundaria" />
            </Form.Item>

            <Form.Item
              label="Bebida"
              name="bebida"
              rules={[
                {
                  required: true,
                  message: 'Ingrese Bebida'
                }
              ]}
            >
              <Input placeholder="Bebida" />
            </Form.Item>

            
            
              <Form.Item shouldUpdate={(prevValues, curValues) => curValues.comida !== prevValues.comida}>
                {() => {
                  return (form.getFieldValue('comida') === 2 || form.getFieldValue("comida") === 4) && (
                    <Form.Item 
                      name="postres"
                      label="¿Ingerio Postre?"

                    >
                    <Group>
                      <Radio value={1}>Si</Radio>
                      <Radio value={2}>No</Radio>
                    </Group>
                    </Form.Item>
                  );
                }}
              </Form.Item>
              
              <Form.Item shouldUpdate={(prevValues, curValues) => curValues.postres !== prevValues.postres}>
                {() => {
                  return (form.getFieldValue('postres') === 1 ) && (
                    <Form.Item 
                      name="dulce"
                      label="¿Tenia tentación de ingerir otro alimento?"                 
                    >

                    <Group labelCol={ {xs: {span: 10}, sm: {span: 12} } } wrapperCol={ {xs: {span: 4}, sm: {span: 8} } } >
                      <Radio value={1}>Si</Radio>
                      <Radio value={2}>No</Radio>
                    </Group>
                    </Form.Item>
                  );
                }}
              </Form.Item>

              <Form.Item shouldUpdate={(prevValues, curValues) => curValues.dulce !== prevValues.dulce}>
                {() => {
                  return (form.getFieldValue('dulce') === 1 ) && (
                    <Form.Item 
                      name="comidita"
                      label="¿Se quedo con hambre?r"

                    >

                    <Group>
                      <Radio value={1}>Si</Radio>
                      <Radio value={2}>No</Radio>
                    </Group>
                    </Form.Item>
                  );
                }}
              </Form.Item>
           

            {
              prescription?
              <Prescription data={data} />
              : null
            }

            <div className="btn-register">
              <Button onClick={showPrescription} type="primary" htmlType="submit">
                Guardar
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button htmlType="button" onClick={deleteFields}>
                Borrar campos
              </Button>
              
            </div>


          </div>

        </Form>

      </div>
    </div>
  )
}

export default HomeScreen
