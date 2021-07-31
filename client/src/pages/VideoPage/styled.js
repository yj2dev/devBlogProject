import styled from 'styled-components';

export const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  border: 2px solid green;
`;
export const VideoCardContainer = styled.div`
  //border: 2px solid red;
  position: relative;
  max-width: 300px;
  padding: 8px;
  width: 100%;
  & img {
    width: 100%;
  }
`;
export const VideoLength = styled.div`
  position: absolute;
  top: 160px;
  right: 16px;
  background-color: #000;
  color: #fff;
  font-weight: 800;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 3px;
`;
export const VideoInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;
export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const VideoTitle = styled.div`
  font-size: 15px;
  color: #000;
`;
export const VideoArticle = styled.div`
  font-size: 14px;
  color: gray;
`;
export const VideoView = styled.span`
  &::before {
    content: '조회수 ';
  }
  &::after {
    content: '회';
  }
`;
export const ProfileImage = styled.span`
  flex: none;
  color: red;
  margin-right: 14px;

  & > img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;
