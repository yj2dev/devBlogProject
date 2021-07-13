import { withRouter } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import {
  LinkToGitHub,
  Button,
  SignUpButton,
  SignInButton,
  Profile,
  LogoutButton,
} from "./styled";
import { useSelector } from "react-redux";

import SignInModal from "../../SignInModal";
import SignUpModal from "../../SignUpModal";

function RightItem({ history }) {
  //로그인 모달 변수
  const isLogin = useSelector((state) => state.user);

  console.log("isLogin => ", isLogin);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userState] = useState("사용자 정보 없음");
  //회원가입 모달 변수
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const onToggleSignIn = () => {
    setShowSignInModal((prev) => !prev);
  };

  const onToggleSignUp = () => {
    setShowSignUpModal((prev) => !prev);
  };
  const onCloseModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };

  //로그인 모달의 하단 회원가입 바로가기 버튼
  const onClickSignUpButton = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  //회원가입 모달의 하단 로그인 바로가기 버튼
  const onClickSignInButton = (e) => {
    setShowSignUpModal(false);
    setShowSignInModal(true);
  };

  const onClickSignoutButton = () => {
    axios
      .get("/api/users/signout")
      .then((res) => {
        //로그아웃 성공

        if (res.data.success) {
          history.push("/");
        }
      })
      .catch((err) => {
        alert("로그아웃에 실패했습니다.");
      });
  };

  console.log("isLogin.authStatus : ", isLogin.authStatus);

  //리덕스에 있는 로그인 상태에 따라 상단바를 변경함
  if (isLogin.authStatus && !isLogin.authStatus.isAuth) {
    return (
      <div style={{ float: "right" }}>
        {/* 깃허브 링크 */}
        <LinkToGitHub href="https://github.com/nogoduck" target="_blank">
          GitHub
          <BiLinkExternal />
        </LinkToGitHub>

        {/* 로그인  모달 */}
        <SignInButton onClick={onToggleSignIn}>
          <div>로그인</div>
          <div>{userState}</div>
        </SignInButton>
        <SignInModal show={showSignInModal} close={onCloseModal}>
          <Button onClick={onClickSignUpButton}>계정 생성하기</Button>
        </SignInModal>

        {/* 회원가입 모달 */}

        {isLogin.signupSuccess && isLogin.signupSuccess.signupSuccess && (
          <div>성공</div>
        )}

        <SignUpButton onClick={onToggleSignUp}>회원가입</SignUpButton>
        <SignUpModal show={showSignUpModal} close={onCloseModal}>
          이미 계정이 있습니까?&nbsp;
          <span onClick={onClickSignInButton}>로그인 &raquo; </span>
        </SignUpModal>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ float: "right" }}>
          {/* 깃허브 링크 */}
          <LinkToGitHub href="https://github.com/nogoduck" target="_blank">
            GitHub
            <BiLinkExternal />
          </LinkToGitHub>

          <Profile>{isLogin.authStatus.name}</Profile>
          <LogoutButton onClick={onClickSignoutButton}>로그아웃</LogoutButton>
        </div>
      </div>
    );
  }
}

export default withRouter(RightItem);
