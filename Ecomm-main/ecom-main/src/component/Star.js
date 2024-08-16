import styled from "styled-components";

const Star = ({ reviews }) => {
  return (
    <Wrapper>
      <div className="reviews-style">
        <p>({reviews} customer reviews)</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .reviews-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    p {
      margin: 0;
      padding-left: 1.2rem;
      color: #333; // Adjust the color as needed
    }
  }
`;

export default Star;
