import Container from '@/components/Container';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, GetProp, Row, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import InfoItem from './components/InfoItem';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Container>
      <ProCard
        title={<strong>个人信息</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={
          <Button type="primary" onClick={() => {}}>
            更新信息
          </Button>
        }
      >
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'昵称'} value={initialState?.currentUser?.username} type="copy" />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'账号'} value={initialState?.currentUser?.userAccount} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'邮箱'} value={initialState?.currentUser?.email} type={'editor'} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'性别'}
              value={
                initialState?.currentUser?.gender
                  ? initialState?.currentUser?.gender === 1
                    ? '男'
                    : '女'
                  : '未设置'
              }
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'手机'} value={initialState?.currentUser?.phone} type={'editor'} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'金币'} value={initialState?.currentUser?.phone} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'用户类型'}
              value={initialState?.currentUser?.userRole === 1 ? '管理员' : '普通用户'}
              type={'editor'}
            />
          </Col>
        </Row>
      </ProCard>
      <ProCard
        title={<strong>开发者API密钥</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={20}>
            <InfoItem
              name={'accessKey'}
              value={initialState?.currentUser?.accessKey}
              type={'copy'}
            />
          </Col>
          <Col className="gutter-row" span={20}>
            <InfoItem
              name={'secretKey'}
              value={initialState?.currentUser?.secretKey}
              type={'copy'}
            />
          </Col>
        </Row>
      </ProCard>
    </Container>
  );
};
