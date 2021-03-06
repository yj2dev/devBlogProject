import { Route, Switch, useLocation, withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import React from 'react';

import { Container, Main, ContentContainer, Content, Notice } from './styled';
import TopNav from './Header/TopNav';
import SideNav from './Nav/LeftSideNav';
import Footer from './Footer';

import LandingContent from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import BoardPage from '../pages/BoardPage';
import CardPage from '../pages/CardPage';
import ExperimentPage from '../pages/ExperimentPage';
import VideoPage from '../pages/VideoPage';
import VideoUploadPage from '../pages/VideoUploadPage';
import VideoDetailPage from '../pages/VideoDetailPage';
import BoardWritePage from '../pages/BoardWritePage';
import BoardDetailPage from '../pages/BoardDetailPage';
import SettingPage from '../pages/SettingPage';

import Auth from '../hoc/auth';
import OptimizationPage from '../pages/BoardPage/Section/OptimizationPage';
import HotPage from '../pages/BoardPage/Section/HotPage';

// Auth 매개변수:
// (1, 2, 3) :
// 1: 컴포넌트
// 2: null(로그인 여부 상관 없음),
//   true(로그인 한 유저만 랜더링),
//   false(로그인 안한 유저는 접근제한)
// 3: 값을 넘기지 않으면 기본값 null, 유저등급 지정
// ex) 0 = 1 = admin, 2 = guest
function LandingPage({ history }) {
  const isDesktop = useMediaQuery({ query: '(min-width:921px)' });

  const { pathname } = useLocation();

  if (pathname === '/') {
    history.push('/home');
  }
  return (
    <Container>
      <SideNav />
      <Main>
        <TopNav />
        <ContentContainer>
          <Content className={isDesktop ? '' : 'full'}>
            <Switch>
              <Route
                exact
                path="/home"
                component={Auth(LandingContent, null)}
              />
              <Route path="/about" component={Auth(AboutPage, false)} />
              <Route
                exact
                path="/board/write"
                component={Auth(BoardWritePage, true)}
              />
              <Route true path="/board/hot" component={Auth(HotPage, true)} />

              <Route
                path="/board/optimization"
                component={Auth(OptimizationPage, null)}
              />
              <Route
                path="/board/:postId"
                component={Auth(BoardDetailPage, null)}
              />
              <Route path="/board" component={Auth(BoardPage, null)} />
              <Route path="/card" component={Auth(CardPage, null)} />
              <Route
                path="/experiment"
                component={Auth(ExperimentPage, null)}
              />
              <Route
                path="/video/upload"
                component={Auth(VideoUploadPage, null)}
              />
              <Route
                path="/video/:videoId"
                component={Auth(VideoDetailPage, null)}
              />
              <Route path="/video" component={Auth(VideoPage, null)} />
              <Route path="/setting" component={Auth(SettingPage, null)} />
            </Switch>
          </Content>
          <Footer />
        </ContentContainer>
      </Main>
    </Container>
  );
}

export default withRouter(LandingPage);
