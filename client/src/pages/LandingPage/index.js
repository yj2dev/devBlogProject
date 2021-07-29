import { Route, Switch, withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import React, { useState } from "react";

import { Main, ContentContainer, Content } from "./styled";
import TopNav from "../../components/TopNav";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";

import LandingContent from "./LangdingContent";
import AboutPage from "../AboutPage";
import BoardPage from "../BoardPage";
import CardPage from "../CardPage";
import ExperimentPage from "../ExperimentPage";
import VideoPage from "../VideoPage";
import BoardWritePage from "../BoardWritePage";
import BoardDetailPage from "../BoardDetailPage";
import SettingPage from "../SettingPage";

import Auth from "../../hoc/auth";

// Auth 매개변수:
// (1, 2, 3) :
// 1: 컴포넌트
// 2: null(로그인 여부 상관 없음),
//   true(로그인 한 유저만 랜더링),
//   false(로그인 안한 유저는 접근제한)
// 3: 값을 넘기지 않으면 기본값 null, 유저등급 지정
// ex) 0 = 1 = admin, 2 = guest
import axios from "axios";
function LandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width:1024px)" });
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");

  const connectServer = () => {
    axios
      .get("/api/test")
      .then(({ data }) => {
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const connectServer2 = () => {
    axios
      .get("https://devlog-ad.herokuapp.com/api/test")
      .then(({ data }) => {
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={connectServer}>Result connect to server</button>
      <div>{result}</div>
      <button onClick={connectServer2}>Result connect to server2</button>
      <div>{result2}</div>
      <TopNav />
      <Main>
        <SideNav />
        <ContentContainer>
          <Content className={isDesktop ? "" : "full"}>
            <Switch>
              <Route exact path="/" component={Auth(LandingContent, null)} />
              <Route path="/menu/about" component={Auth(AboutPage, false)} />
              <Route
                true
                path="/menu/board/write"
                component={Auth(BoardWritePage, true)}
              />
              <Route
                path="/menu/board/:postId"
                component={Auth(BoardDetailPage, null)}
              />
              <Route path="/menu/board" component={Auth(BoardPage, null)} />
              <Route path="/menu/card" component={Auth(CardPage, null)} />
              <Route
                path="/menu/experiment"
                component={Auth(ExperimentPage, null)}
              />
              <Route path="/menu/video" component={Auth(VideoPage, null)} />
              <Route path="/setting" component={Auth(SettingPage, null)} />
            </Switch>
          </Content>
          <Footer />
        </ContentContainer>
      </Main>
    </>
  );
}

export default withRouter(LandingPage);
