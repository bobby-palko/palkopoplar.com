/* eslint-disable react/no-danger */
import { useRef } from 'react';
import styled from 'styled-components';

const StyledAccordionItem = styled.li.attrs((props) => ({
  className: props.className,
}))<{ delay: number }>`
  border-top: 2px solid var(--cream);
  transform: rotateX(90deg);

  animation: flipIn 1000ms ease ${(props) => props.delay * 150}ms forwards;

  @keyframes flipIn {
    /* 0% {
      transform: rotateX(90deg);
    } */
    100% {
      transform: rotateX(0);
    }
  }

  button {
    position: relative;
    font-size: 4rem;
    font-family: inherit;
    background-color: var(--bgPink);
    color: var(--black);
    border: none;
    cursor: pointer;
    width: 100%;
    margin: 0;
    padding: 0.1em 0.5em;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    word-spacing: 0.33rem;
  }

  button span {
    z-index: 1;
  }

  button:before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(130deg, transparent 0% 55%, var(--pink) 100%);
    background-position: 0% 0%;
    background-size: 300% 300%;
    transition: background-position ease 350ms;
  }

  span.control {
    font-size: 8rem;
  }

  .answer {
    padding: 1em;
    font-size: 2.2rem;
    line-height: 1.5em;
  }

  &.active button:before {
    background-position: 100% 100%;
  }

  .answer-wrapper {
    overflow: hidden;
    transition: height ease 250ms;
  }
`;

interface Props {
  faq: {
    question: string;
    answer: string;
  };
  onToggle: () => void;
  active: boolean;
  delay: number;
}

function AccordionItem({ faq, onToggle, active, delay }: Props) {
  const { question, answer } = faq;

  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <StyledAccordionItem className={active ? 'active' : ''} delay={delay}>
      <button type="button" onClick={onToggle}>
        <span>{question}</span>
        <span className="control">{active ? '-' : '+'}</span>
      </button>
      <div
        ref={contentEl}
        className="answer-wrapper"
        style={
          active
            ? {
                height: contentEl.current?.scrollHeight,
              }
            : { height: '0px' }
        }
      >
        <div className="answer" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </StyledAccordionItem>
  );
}

export default AccordionItem;
