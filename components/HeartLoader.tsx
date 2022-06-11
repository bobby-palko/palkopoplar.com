import styled from 'styled-components';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  position: relative;
  width: 40px;
  height: 60px;
  animation: heartBeat 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  :before,
  :after {
    content: '';
    background: var(--hotPink);
    width: 40px;
    height: 60px;
    border-radius: 50px 50px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(45deg);
    transform-origin: 50% 68%;
    box-shadow: 5px 4px 5px var(--pink) inset;
  }
  :after {
    transform: rotate(-45deg);
  }
  @keyframes heartBeat {
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;

function HeartLoader() {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
}

export default HeartLoader;
