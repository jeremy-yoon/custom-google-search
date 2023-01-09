import React, { useState, useEffect } from "react";
import styled from "styled-components";

//styles
import { colors } from "@/styles/colors";

//assets
import { IcSearch, IcDelete } from "@/assets";

interface IInput {
  inputType?: "text" | "password" | "email" | "number";
  placeholder?: string;
  initialValue?: string | null;
  hasSearchButton?: boolean;
  onKeyPressEnter?: (value: string) => void;
}

export const Input: React.FC<IInput> = ({
  inputType,
  placeholder = "Search query",
  initialValue,
  hasSearchButton = true,
  onKeyPressEnter,
}) => {
  const [isHighlight, setIsHighlight] = useState(false);
  const [value, setValue] = useState("");

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onKeyPressEnter && value) onKeyPressEnter(value);
    }
  };

  const deleteValue = () => {
    setValue("");
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  return (
    <S.Container>
      {hasSearchButton && (
        <S.IcSearchButton fill={isHighlight ? colors.primary : colors.g3} />
      )}
      <S.Input
        type={inputType}
        placeholder={placeholder}
        maxLength={100}
        value={value}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
        onFocus={() => setIsHighlight(true)}
        onBlur={() => setIsHighlight(false)}
        onMouseOver={() => setIsHighlight(true)}
        onMouseOut={() => setIsHighlight(false)}
        hasLeftPadding={hasSearchButton}
        isHighlight={isHighlight}
      />
      {value && <S.IcDeleteButton onClick={deleteValue} />}
    </S.Container>
  );
};

const S: any = {};

S.Container = styled.div`
  position: relative;
  width: 100%;
`;

S.IcSearchButton = styled(IcSearch)`
  position: absolute;
  margin-left: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

S.IcDeleteButton = styled(IcDelete)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

S.Input = styled.input<{ hasLeftPadding: boolean; isHighlight: boolean }>`
  border-radius: 1000px;
  font-size: 16px;
  outline: none;
  height: 48px;
  padding-left: ${({ hasLeftPadding }) => (hasLeftPadding ? "56px" : "16px")};
  padding-right: 48px;
  width: 100%;
  caret-color: ${colors.primary};
  &::placeholder {
    color: ${colors.g5};
  }
  border: 1.5px solid
    ${({ isHighlight }) => (isHighlight ? colors.primary : colors.g5)};
`;
