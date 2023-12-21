import React from 'react';
import { Card, Typography } from '@arco-design/web-react';

const { Title } = Typography;

export default function BasiceEditor() {
  return (
    <Card>
      <Title heading={6}>{'你好'}</Title>
      <div>bisic editor</div>
    </Card>
  );
}
