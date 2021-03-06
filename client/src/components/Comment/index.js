import React, { useState } from 'react';
import {
  Container,
  TextareaComment,
  Main,
  Form,
  CancelButton,
  SubmitButton,
  CommentNestedContainer,
} from './styled';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentOrigin from '../CommentOrigin';
import CommentNested from '../CommentNested';
import DefaultProfile from '../DefaultProfileImg';
import TextareaAutosize from 'react-textarea-autosize';

const Comment = ({ match, reRender, commentItems }) => {
  const user = useSelector((state) => state.user);
  const isLogin = user.authStatus.isAuth;
  const [inputComment, setInputComment] = useState('');
  const postId = match.params.postId;
  const [showCommentButton, setShowCommentButton] = useState(false);

  const onChangeInputComment = (e) => {
    if (isLogin) {
      setInputComment(e.target.value);
    }
  };

  const onSubmitComment = (e) => {
    e.preventDefault();

    if (!isLogin) {
      alert('로그인 한 유저만 댓글을 작성할 수 있습니다.');
      return null;
    }

    if (inputComment === '') return null;

    const payload = {
      postId: postId,
      writer: user.authStatus._id,
      content: inputComment,
    };
    axios.post('/api/comment/createComment', payload).then(({ data }) => {
      if (data.success) {
        // console.log(data.doc);
        setInputComment('');
        reRender(data.doc);
      } else {
        console.log('댓글을 불러오지 못했습니다');
      }
    });
  };

  const onClickCancelComment = () => {
    setInputComment('');
    setShowCommentButton(false);
  };

  const onFocusTextarea = () => {
    setShowCommentButton(true);
  };

  return (
    <Container>
      <hr />
      <Main>댓글</Main>
      <Form onSubmit={onSubmitComment}>
        <div>
          <DefaultProfile
            useName={false}
            style={{
              width: '40px',
              height: '40px',
              flex: 'none',
            }}
          />

          <TextareaComment>
            <TextareaAutosize
              value={inputComment}
              onChange={onChangeInputComment}
              onFocus={onFocusTextarea}
              placeholder={
                !isLogin
                  ? '로그인 한 유저만 댓글을 작성할 수 있습니다.'
                  : '공개 댓글 추가...'
              }
            />
          </TextareaComment>
        </div>

        {showCommentButton && (
          <>
            <SubmitButton type="submit" id={inputComment ? '' : 'passive'}>
              댓글
            </SubmitButton>
            <CancelButton onClick={inputComment ? null : onClickCancelComment}>
              취소
            </CancelButton>
          </>
        )}
      </Form>

      {commentItems &&
        commentItems.map(
          (v, i) =>
            !v.responseTo && (
              <>
                <CommentOrigin reRender={reRender} commentOriginItems={v} />
                <CommentNestedContainer>
                  <CommentNested
                    originId={v._id}
                    commentNestedItems={commentItems}
                  />
                </CommentNestedContainer>
              </>
            )
        )}
    </Container>
  );
};

export default withRouter(Comment);
