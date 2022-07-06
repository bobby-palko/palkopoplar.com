import { useRef } from 'react';
import styled from 'styled-components';

const StyledAccordionItem = styled.li.attrs((props) => ({
  className: props.className,
}))`
  border-top: 2px solid var(--cream);

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
  }

  button:before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      130deg,
      transparent 0% 33%,
      var(--pink) 66%,
      var(--hotPink) 100%
    );
    background-position: 0% 0%;
    background-size: 300% 300%;
    transition: background-position ease 0.5s;
  }

  span {
    font-size: 8rem;
  }

  .answer {
    padding: 1em;
    font-size: 2.2rem;
  }

  &.active button {
    position: relative;
    color: var(--white);
  }

  &.active button:before {
    background-position: 100% 100%;
    z-index: -1;
  }

  .answer-wrapper {
    overflow: hidden;
    height: 0;
    transition: height ease 0.2s;
  }

  .answer-wrapper.open {
    height: 100px;
  }
`;

interface Props {
  faq: {
    question: string;
    answer: string;
  };
  onToggle: () => void;
  active: boolean;
}

function AccordionItem({ faq, onToggle, active }: Props) {
  const { question, answer } = faq;

  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <StyledAccordionItem className={active ? 'active' : ''}>
      <button type="button" onClick={onToggle}>
        {question}
        <span>{active ? '-' : '+'}</span>
      </button>
      <div
        ref={contentEl}
        className="answer-wrapper"
        style={
          active
            ? { height: contentEl.current?.scrollHeight }
            : { height: '0px' }
        }
      >
        <div className="answer">{answer}</div>
      </div>
    </StyledAccordionItem>
  );
}

export default AccordionItem;
