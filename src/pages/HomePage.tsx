import styled from "styled-components";
import { useNavigate, createSearchParams } from "react-router-dom";

//components
import { Input } from "@/components";

//assets
import { IcJelog } from "@/assets";

export const HomePage = () => {
  const navigate = useNavigate();

  const goToSearchPage = (query: string) => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        query,
      }).toString(),
    });
  };

  return (
    <S.Container>
      <S.Wrapper>
        <IcJelog fill="black" />
        <Input onKeyPressEnter={goToSearchPage} />
      </S.Wrapper>
    </S.Container>
  );
};

const S = {} as any;

S.Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
  width: 100%;
  max-width: 560px;
  padding: 0 24px;
  margin-bottom: 128px;
`;
