import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

/*
 * Adapter so react-modal can play nice with styled-components
 * react-modal only takes class names or inline styles as an object
 * so things like media queries not possible with styled-components
 *
 * https://github.com/reactjs/react-modal/issues/603
 */

interface Props extends Modal.Props {
  className?: string;
}

const ReactModalAdapter = ({ className = '', ...props }: Props) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

export const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 500px) {
      overflow-x: hidden;
      overscroll-behavior-x: none;
    }
  }

  &__content {
    position: absolute;
    background-color: var(--cream);
    border: none;
    border-radius: 10px;
    padding: 0;
    inset: 10% 25%;
    overflow: scroll;
    @media (max-width: 800px) {
      inset: 5% 10%;
    }
    @media (max-width: 500px) {
      inset: 0;
      border-radius: 0;
    }
    @media screen and (max-width: 500px) {
      overflow-x: hidden;
      overscroll-behavior-x: none;
    }
  }
  &__content:focus {
    outline: none;
  }
`;
