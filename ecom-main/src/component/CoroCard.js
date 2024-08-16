import React from "react";
import styled from "styled-components";
const CoroCard = ({ actualData }) => {
  const { pphoto, pname, pdes } = actualData; // Destructure the properties you need

  return (
    <CardWrapper>
      
      <div className="banner-image">
        <Image src={pphoto} alt={pname} />
      </div>
      <Content>
        <Title>{pname}</Title>
        <Description>{pdes}</Description>
      </Content>
    </CardWrapper>
  );
};

export default CoroCard;
const CardWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
`;
