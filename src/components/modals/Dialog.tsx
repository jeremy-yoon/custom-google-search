import React from "react";
import styled, { keyframes } from "styled-components";

//styles
import { colors } from "@/styles/colors";

//assets
import { IcX } from "@/assets";

interface IDialog {
  title?: string;
  okText?: string;
  showOverlay?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dialog: React.FC<IDialog> = ({
  title = "Something went wrong",
  okText = "OK",
  showOverlay = true,
  isOpen,
  setIsOpen,
}) => {
  const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <>
        {showOverlay && <S.Overlay />}
        <S.Container>
          <S.HeaderWrapper>
            <S.Title>{title}</S.Title>
            <S.IcXButton
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                onClose(e)
              }
            />
          </S.HeaderWrapper>
          <S.FooterWrapper>
            <S.OKButton
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                onClose(e)
              }
            >
              {okText}
            </S.OKButton>
          </S.FooterWrapper>
        </S.Container>
      </>
    );
  } else {
    return null;
  }
};

const S: any = {};

const openAnimation = keyframes`
  from {
	opacity: 0;
	transform: scale(0.8) translate(-50%, -50%);
  }
    to {
	opacity: 1;
	transform: scale(1) translate(-50%, -50%);
  }
`;

const overlayAnimation = keyframes`
  from {
	opacity: 0;
  }
    to {
	opacity: 0.5;
  }
`;

S.Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  padding: 24px;
  background-color: ${colors.g10};
  border-radius: 20px;
  width: 360px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0px 2px 24px rgba(39, 43, 49, 0.2);
  animation: ${openAnimation} 0.3s ease-in-out;
  z-index: 10000;
`;

S.HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

S.Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.g0};
  line-height: 24px;
`;

S.IcXButton = styled(IcX)`
  cursor: pointer;
`;

S.FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

S.OKButton = styled.div`
  padding: 14px 24px;
  background-color: ${colors.primary};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.g10};
  line-height: 14px;
`;

S.Overlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(51, 55, 61);
  opacity: 0.5;
  animation: ${overlayAnimation} 0.3s ease-in-out;
`;
