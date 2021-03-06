import { AiOutlineBug } from 'react-icons/ai';
import React from 'react';
import { Container } from './styled';

const Index = () => {
  return (
    <Container>
      <div>
        <div
          style={{
            fontSize: '160px',
            background:
              'linear-gradient(142deg, rgba(16,250,43,1) 0%, rgba(45,112,182,1) 50%, rgba(255,1,1,1) 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: '800',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Bug
        </div>
        <AiOutlineBug
          style={{
            fontSize: '400px',
            background:
              'linear-gradient(142deg, rgba(16,250,43,1) 0%, rgba(45,112,182,1) 50%, rgba(255,1,1,1) 100%)',
            color: '#fff',
            borderRadius: '32px',
            marginBottom: '32px',
          }}
        />
      </div>
    </Container>
  );
};

export default Index;
