import React from "react";
import styled from "styled-components";

//styles
import { colors } from "@/styles/colors";

//components
import { BookMarkButton } from "@/components";

//assets
import { DefaultFavi, defaultThumb } from "@/assets";

interface IPost {
  id: string;
  title: string;
  netloc: string;
  url: string;
  imageUrl?: string;
  faviconUrl?: string;
  initialIsSaved?: boolean;
}

export const Post: React.FC<IPost> = React.memo(
  ({
    id,
    title,
    netloc,
    url,
    imageUrl = defaultThumb,
    faviconUrl = DefaultFavi,
    initialIsSaved = false,
  }) => {
    const goToLink = () => {
      window.open(url, "_blank");
    };

    const handleImageError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null;
      target.src = defaultThumb;
    };

    const handleFaviError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null;
      target.src = DefaultFavi;
    };

    return (
      <S.Container onClick={goToLink}>
        <S.Wrapper>
          <S.PostImage src={imageUrl} onError={handleImageError} />
          <S.PostContentWrapper>
            <S.Title>{title}</S.Title>
            <S.LinkWrapper>
              <S.Favicon src={faviconUrl} onError={handleFaviError} />
              <S.Link>{netloc}</S.Link>
            </S.LinkWrapper>
          </S.PostContentWrapper>
          <BookMarkButton postId={id} initialIsSaved={initialIsSaved} />
        </S.Wrapper>
      </S.Container>
    );
  }
);

const S: any = {};

S.Container = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

S.Wrapper = styled.div`
  width: 100%;
  max-width: 688px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

S.PostImage = styled.img`
  min-width: 72px;
  max-width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
`;

S.PostContentWrapper = styled.div`
  max-width: 688px;
  min-width: calc(100% - 136px);
  height: 72px;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${colors.g1};
`;

S.LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  column-gap: 6px;
`;

S.Favicon = styled.img`
  width: 14px;
  height: 14px;
`;

S.Link = styled.span`
  font-size: 13px;
  line-height: 13px;
  color: ${colors.g3};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
