import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";

//apis
import { postBookmark, deleteBookmark } from "@/apis";

//styles
import { colors } from "@/styles/colors";

//components
import { Dialog } from "@/components";

//assets
import { IcSave } from "@/assets";

interface IBookMarkButton {
  postId: string;
  initialIsSaved?: boolean;
}

export const BookMarkButton: React.FC<IBookMarkButton> = ({
  postId,
  initialIsSaved = false,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const { mutate: mutatePostBookmark } = useMutation(
    (id: string) => postBookmark(id),
    {
      onSuccess: () => {
        setIsSaved(true);
      },
      onError: () => {
        setIsSaved(false);
        setOpenErrorDialog(true);
      },
    }
  );

  const { mutate: mutateDeleteBookmark } = useMutation(
    (id: string) => deleteBookmark(id),
    {
      onSuccess: () => {
        setIsSaved(false);
      },
      onError: () => {
        setIsSaved(true);
        setOpenErrorDialog(true);
      },
    }
  );

  const onClickSaveButton = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (isSaved) {
      mutateDeleteBookmark(id);
    } else {
      mutatePostBookmark(id);
    }
  };

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved]);

  return (
    <>
      <S.IcSaveButton
        onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
          onClickSaveButton(e, postId.toString())
        }
        fill={isSaved ? colors.primary : colors.g10}
        stroke={isSaved ? colors.primary : colors.g3}
      />
      <Dialog open={openErrorDialog} setOpen={setOpenErrorDialog} />
    </>
  );
};

const S: any = {};

S.IcSaveButton = styled(IcSave)`
  cursor: pointer;
  margin-left: 40px;
  padding: 8px;
  min-width: 40px;
  height: 40px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${colors.g6};
      border-radius: 12px;
    }
  }
`;
