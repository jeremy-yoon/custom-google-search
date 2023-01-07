import React from "react";
import styled from "styled-components";
import { skeletonShimmer } from "@/animations";

interface IPostSkeleton {
  repeat?: number;
}

export const PostSkeleton: React.FC<IPostSkeleton> = ({ repeat = 1 }) => {
  return (
    <>
      {Array.from(Array(repeat).keys()).map((_, index) => (
        <S.Container key={index}>
          <S.Wrapper>
            <S.PostImage />
            <S.PostContentWrapper>
              <S.PostContent width="80%" />
              <S.PostContent width="30%" />
            </S.PostContentWrapper>
          </S.Wrapper>
        </S.Container>
      ))}
    </>
  );
};

const S: any = {};

S.Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
`;

S.Wrapper = styled.div`
  width: 100%;
  max-width: 688px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

S.PostImage = styled.div`
  ${skeletonShimmer}
  min-width: 72px;
  height: 72px;
  border-radius: 12px;
`;

S.PostContentWrapper = styled.div`
  width: 100%;
  height: 72px;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.PostContent = styled.div<{ width?: string }>`
  ${skeletonShimmer}
  height: 20px;
  border-radius: 4px;
  width: ${(props) => props.width || "100%"};
`;
