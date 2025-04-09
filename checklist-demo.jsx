imonstmport React from 'react';
import { Card, Progress, Tag, Tooltip, Space, Collapse, Checkbox, Badge, Tabs, Steps, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const data = [
  { 
    title: "Safety", 
    validated: 3, 
    total: 5,
    color: "#ff4d4f",
    icon: "🔒",
    description: "Sécurité et conformité"
  },
  { 
    title: "Microbio", 
    validated: 5, 
    total: 5,
    color: "#52c41a",
    icon: "🔬",
    description: "Validation microbiologique"
  },
  { 
    title: "DG", 
    validated: 0, 
    total: 4,
    color: "#1890ff",
    icon: "📊",
    description: "Données et gestion"
  },
  { 
    title: "Pilote", 
    validated: 2, 
    total: 3,
    color: "#722ed1",
    icon: "✈️",
    description: "Tests pilotes"
  },
  { 
    title: "Performance", 
    validated: 1, 
    total: 4,
    color: "#faad14",
    icon: "⚡",
    description: "Tests de performance"
  }
];

const jalonsDetails = [
  {
    key: '1',
    label: (
      <Space>
        <strong>Safety</strong>
        <Tag color="orange">3/5</Tag>
        <Progress percent={60} size="small" status="active" showInfo={false} />
      </Space>
    ),
    children: (
      <Checkbox.Group>
        <Space direction="vertical">
          <Checkbox checked>Revue technique</Checkbox>
          <Checkbox checked>Rapport de validation</Checkbox>
          <Checkbox>Essai terrain</Checkbox>
          <Checkbox>Go/No-Go</Checkbox>
          <Checkbox checked>Check qualité</Checkbox>
        </Space>
      </Checkbox.Group>
    )
  }
];

const JalonsSteps = ({ jalons }) => (
  <Steps
    current={jalons.findIndex(j => !j.validated)}
    items={jalons.map(jalon => ({
      title: jalon.label,
      status: jalon.validated ? 'finish' : 'wait',
    }))}
  />
);

const App = () => {
  const tabs = [
    {
      key: '1',
      label: '1. Cards + Progress',
      children: (
        <Row gutter={[16, 16]}>
          {data.map((item) => {
            const percent = Math.round((item.validated / item.total) * 100);
            const color = percent === 100 ? 'green' : percent > 0 ? 'orange' : 'red';
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
                <Card 
                  size="small" 
                  style={{ 
                    width: '100%',
                    borderTop: `3px solid ${item.color}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <span style={{ fontSize: '1.5em' }}>{item.icon}</span>
                      <strong>{item.title}</strong>
                    </Space>
                    <Tooltip title={`${item.validated} jalons sur ${item.total}`}>
                      <Tag color={color}>{`${item.validated}/${item.total}`}</Tag>
                    </Tooltip>
                    <Progress 
                      percent={percent} 
                      strokeColor={item.color}
                      format={percent => `${percent}%`}
                    />
                    <div style={{ fontSize: '0.8em', color: '#666' }}>
                      {item.description}
                    </div>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      )
    },
    {
      key: '2',
      label: '2. Statistiques compactes',
      children: (
        <Row gutter={[16, 16]}>
          {data.map(item => {
            const percent = Math.round((item.validated / item.total) * 100);
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
                <Card size="small">
                  <Statistic
                    title={item.title}
                    value={percent}
                    suffix="%"
                    valueStyle={{ color: item.color }}
                    prefix={item.icon}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Progress 
                      percent={percent} 
                      size="small" 
                      strokeColor={item.color}
                      showInfo={false}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )
    },
    {
      key: '3',
      label: '3. Badges avec icônes',
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          {data.map(item => {
            const percent = item.validated / item.total;
            const status = percent === 1 ? 'success' : percent > 0 ? 'warning' : 'error';
            const icon = percent === 1 ? <CheckCircleOutlined /> : 
                        percent > 0 ? <ClockCircleOutlined /> : 
                        <CloseCircleOutlined />;
            
            return (
              <Tooltip 
                title={`${item.validated}/${item.total} jalons validés - ${item.description}`} 
                key={item.title}
              >
                <Badge 
                  status={status} 
                  text={
                    <Space>
                      {item.icon}
                      <span>{item.title}</span>
                      <Tag color={item.color}>{`${item.validated}/${item.total}`}</Tag>
                    </Space>
                  } 
                />
              </Tooltip>
            );
          })}
        </Space>
      )
    },
    {
      key: '4',
      label: '4. Steps (jalons séquentiels)',
      children: (
        <JalonsSteps
          jalons={[
            { label: 'Safety', validated: true },
            { label: 'Microbio', validated: true },
            { label: 'DG', validated: false },
            { label: 'Pilote', validated: false },
            { label: 'Performance', validated: false },
          ]}ma'
        />
      )
    }
  ];

  return <Tabs defaultActiveKey="1" items={tabs} />;
};

export default App; 