import React from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Row,
  Col,
  message
} from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import api from '../../util/api'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const onFinish = async values => {
    try {
      const res = await api.post('/pharmacists', values)
      if (res.status === 201) {
        localStorage.setItem('medbox-token', res.data.pharmacist.token)
        return navigate('/')
      }
      message.error(res.data.msg)
    } catch (err) {
      message.error('Email or Password is wrong, Please try again.')
    }
  }

  return (
    <Row align='middle' justify='space-between'>
      <Col span={6} offset={8} style={{ marginTop: '6rem' }}>
        <Card>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name!'
                }
              ]}
            >
              <Input
                // prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='First name'
              />
            </Form.Item>

            <Form.Item
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Please enter your last name!'
                }
              ]}
            >
              <Input
                // prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Last name'
              />
            </Form.Item>
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your Password!'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: false,
                  message: 'Please enter your Phone!'
                }
              ]}
            >
              <Input
                prefix={<PhoneOutlined className='site-form-item-icon' />}
                type='phone'
                placeholder='Phone (Optional)'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              {/* <a className='login-form-forgot' href=''>
              Forgot password
            </a> */}
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Register
                </Button>
                Or <Link to='/login'> Login!</Link>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Register
