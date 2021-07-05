import styled from "styled-components";

// index.js
export const Container = styled.div`
  float: left;
  margin-left: 10px;
`;

export const LogoContainer = styled.div`
  position: absolute;
  margin: 1px 7px;
  /* margin: 7px; */
  font-size: 26px;
  letter-spacing: 2px;
  padding: 0px 7px 0px 7px;
  font-family: "Roboto", sans-serif;

  &:hover {
  }

  & > div {
    display: inline-block;
    font-size: 36px;
  }

  & > span {
    font-size: 20px;
  }
`;
