import { useState } from 'react';
import styled from 'styled-components';
import { faqs } from '../faqs';
import AccordionItem from './AccordionItem';

const StyledAccordion = styled.ul`
  list-style: none;
  padding: 0;
`;

function Accordion() {
  const [opened, setOpened] = useState(-1);

  const handleToggle = (index: number) => {
    if (opened === index) {
      return setOpened(-1);
    }
    return setOpened(index);
  };

  return (
    <StyledAccordion>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          faq={faq}
          onToggle={() => handleToggle(index)}
          active={opened === index}
          delay={index}
        />
      ))}
    </StyledAccordion>
  );
}

export default Accordion;
