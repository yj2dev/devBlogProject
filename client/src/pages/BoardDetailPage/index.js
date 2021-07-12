import { withRouter } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Container,
  Lodding,
  InputTitle,
  InputDescription,
  DeleteButton,
  UpdateButton,
  BoardHeader,
  Title,
} from "./styled";
import axios from "axios";

function BoardDetailPage() {
  useEffect(() => {
    axios
      .post("http://localhost:5050/api/board/detail", args)
      .then(({ data }) => {
        setDetailPost(data);
        console.log("detail data :: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [detailPost, setDetailPost] = useState("");
  const { pathname } = useLocation();
  const postId = pathname.substring(12);
  const args = {
    _id: postId,
  };

  const [upadteMode, setUpadteMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClickPostUpdate = () => {
    setTitle(detailPost.data.title);
    setDescription(detailPost.data.description);
    setUpadteMode(true);
  };
  const onClickPostDelete = () => {
    //DB로부터 삭제요청
    const deleteId = {
      _id: postId,
    };
    axios
      .post("http://localhost:5050/api/board/delete", deleteId)
      .then(({ data }) => {
        console.log("delete result :: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickPostUpdateComplete = () => {
    //DB에 업데이트 요청
    setUpadteMode(false);
    const variable = { _id: postId, title: title, description: description };
    console.log("post update, variable :: ", variable);
    axios
      .post("http://localhost:5050/api/board/update", variable)
      .then(({ data }) => {
        setDetailPost(data);
        console.log("detail data :: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  if (!detailPost) {
    return <Lodding>로딩중</Lodding>;
  } else {
    if (!upadteMode) {
      return (
        <Container>
          <Link to="/menu/board">뒤로가기</Link>
          <BoardHeader>
            <Title>{detailPost.data.title}</Title>
            {detailPost && (
              <UpdateButton onClick={onClickPostUpdate}>수정하기</UpdateButton>
            )}
          </BoardHeader>
          <p>{detailPost.data.description}</p>
        </Container>
      );
    } else {
      return (
        <Container>
          <Link to="/menu/board">뒤로가기</Link> <br />
          <BoardHeader>
            <InputTitle type="text" value={title} onChange={onChangeTitle} />
            {detailPost && (
              <UpdateButton onClick={onClickPostUpdateComplete}>
                수정완료
              </UpdateButton>
            )}
          </BoardHeader>
          <InputDescription
            type="text"
            value={description}
            onChange={onChangeDescription}
          />
          <DeleteButton onClick={onClickPostDelete}>삭제하기</DeleteButton>
        </Container>
      );
    }
  }
}

export default withRouter(BoardDetailPage);
