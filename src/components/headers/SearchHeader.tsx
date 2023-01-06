import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//styles
import { colors } from "@/styles/colors";

//components
import { Input } from "@/components";
import { BottomLine } from "./components/BottomLine";

//assets
import { IcBack } from "@/assets";

interface ISearchHeader {
  inputType?: "text" | "password" | "email" | "number";
  placeholder?: string;
  initialValue?: string | null;
  onClickInputEnter?: (value: string) => void;
}

export const SearchHeader: React.FC<ISearchHeader> = ({
  inputType,
  placeholder = "Search query",
  initialValue,
  onClickInputEnter,
}) => {
  const navigate = useNavigate();

  const goToBackPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.IcBackButton onClick={goToBackPage} />
        <Input
          hasSearchButton={false}
          inputType={inputType}
          initialValue={initialValue}
          placeholder={placeholder}
          onKeyPressEnter={onClickInputEnter}
        />
      </S.Wrapper>
      <BottomLine />
    </S.Container>
  );
};

const S: any = {};

S.Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${colors.g10};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

S.Wrapper = styled.div`
  width: 100%;
  max-width: 688px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

S.IcBackButton = styled(IcBack)`
  cursor: pointer;
  margin-right: 20px;
  padding: 8px;
  width: 40px;
  height: 40px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${colors.g6};
      border-radius: 12px;
    }
  }
`;
