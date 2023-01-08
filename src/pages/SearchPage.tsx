import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { usePostsQuery } from "@/hooks";

//components
import { SearchHeader, Post, PostSkeleton, Dialog } from "@/components";

//styles
import { colors } from "@/styles/colors";

interface IPost {
  link: string;
  cacheId: string;
  title: string;
  displayLink: string;
  pagemap: {
    cse_thumbnail: {
      src: string;
    }[];
    cse_image: {
      src: string;
    }[];
  };
}

export const SearchPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") as string;

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isErrorDialogOpen,
    setIsErrorDialogOpen,
  } = usePostsQuery(query);

  const [bottomElementRef, inView] = useInView();

  const goToSearchPage = (query: string) => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        query,
      }).toString(),
    });
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderData = () => {
    if (typeof data === "undefined") {
      return null;
    }
    return data.pages.map((page: any) => {
      return page.items.map((post: IPost) => {
        return (
          <Post
            key={post.link}
            id={post.cacheId}
            title={post.title}
            imageUrl={post.pagemap?.cse_image?.[0]?.src}
            displayLink={post.displayLink}
            link={post.link}
            faviconUrl={post.pagemap?.cse_thumbnail?.[0]?.src}
            initialIsSaved={false}
          />
        );
      });
    });
  };

  useEffect(() => {
    if (query && inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <S.Container>
        <SearchHeader initialValue={query} onClickInputEnter={goToSearchPage} />
        <S.PostsWrapper>
          {renderData()}
          {isFetching && <PostSkeleton repeat={10} />}
          <div ref={bottomElementRef} />
        </S.PostsWrapper>
      </S.Container>
      <Dialog isOpen={isErrorDialogOpen} setIsOpen={setIsErrorDialogOpen} />
    </>
  );
};

const S: any = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  min-height: 100vh;
`;

S.PostsWrapper = styled.section`
  padding-top: 88px;
  width: 100%;
  height: 100%;
`;

S.HelpText = styled.span`
  margin-top: 40px;
  font-size: 14px;
  color: ${colors.g4};
  text-align: center;
  display: flex;
  justify-content: center;
`;
