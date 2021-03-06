import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';

import { Container, LikeButton, DislikeButton } from './styled';
import SignInModal from '../SignInModal';
import { useSelector } from 'react-redux';

const LikeAndDislike = ({ board, userId, postId, commentId, style }) => {
  const user = useSelector((state) => state.user);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const [showSigninModal, setShowSigninModal] = useState(false);

  const onCloseSigninModal = () => {
    setShowSigninModal(false);
  };

  const isLogin = () => {
    if (!user.authStatus.isAuth) {
      setShowSigninModal(true);
      return true;
    }
  };

  let payload = {};

  if (board) {
    payload = { userId, postId };
  } else {
    payload = { userId, commentId };
  }

  useEffect(() => {
    console.log('payload >> ', payload);
    axios.post('/api/like/getLike', payload).then(({ data }) => {
      if (data.success) {
        //Succeed, doc(like)
        setLike(data.doc.length);

        data.doc.map((v) => {
          if (v.userId === userId) {
            setLikeActive(true);
          }
        });
      } else {
        //Failed
        console.log('좋아요 목록을 불러오지 못했습니다.');
      }
    });

    axios.post('/api/like/getDislike', payload).then(({ data }) => {
      if (data.success) {
        //Succeed, doc(dislike)
        setDislike(data.doc.length);

        data.doc.map((v) => {
          if (v.userId === userId) {
            setDislikeActive(true);
          }
        });
      } else {
        //Failed
        console.log('싫어요 목록을 불러오지 못했습니다.');
      }
    });
  }, []);

  const onClickLike = () => {
    if (isLogin()) {
      return null;
    }
    if (!likeActive) {
      axios.post('/api/like/addLike', payload).then(({ data }) => {
        if (data.success) {
          setLike(like + 1);
          setLikeActive(true);

          if (dislikeActive) {
            setDislikeActive(false);
            setDislike(dislike - 1);
          }
        } else {
          alert('좋아요를 추가하지 못했습니다.');
        }
      });
    } else {
      axios.post('/api/like/removeLike', payload).then(({ data }) => {
        if (data.success) {
          setLike(like - 1);
          setLikeActive(false);
        } else {
          alert('좋아요를 내리지 못했습니다.');
        }
      });
    }
  };

  const onClickDislike = () => {
    if (isLogin()) {
      return null;
    }

    if (!dislikeActive) {
      axios.post('/api/like/addDislike', payload).then(({ data }) => {
        if (data.success) {
          setDislike(dislike + 1);
          setDislikeActive(true);

          if (likeActive) {
            setLikeActive(false);
            setLike(like - 1);
          }
        } else {
          alert('싫어요를 추가하지 못했습니다.');
        }
      });
    } else {
      axios.post('/api/like/removeDislike', payload).then(({ data }) => {
        if (data.success) {
          setDislike(dislike - 1);
          setDislikeActive(false);
        } else {
          alert('싫어요를 내리지 못했습니다.');
        }
      });
    }
  };

  return (
    <Container>
      <LikeButton>
        {likeActive ? (
          <AiFillLike
            onClick={onClickLike}
            style={{
              ...style,
              color: '#348dff',
            }}
          />
        ) : (
          <AiOutlineLike onClick={onClickLike} style={style} />
        )}
        {like > 0 && like}
      </LikeButton>
      <DislikeButton>
        {dislikeActive ? (
          <AiFillDislike
            onClick={onClickDislike}
            style={{
              ...style,
              color: '#348dff',
              padding: '6px 0 0 0',
              transform: 'rotateY(180deg)',
            }}
          />
        ) : (
          <AiOutlineDislike
            onClick={onClickDislike}
            style={{
              ...style,
              padding: '6px 0 0 0',
              transform: 'rotateY(180deg)',
            }}
          />
        )}
        {dislike > 0 && dislike}
      </DislikeButton>
      <SignInModal show={showSigninModal} close={onCloseSigninModal} />
    </Container>
  );
};

export default LikeAndDislike;
