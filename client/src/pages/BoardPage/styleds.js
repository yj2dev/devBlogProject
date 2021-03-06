import styled from 'styled-components';

export const Container = styled.table`
  display: flex;
  flex-direction: column;
  position: relative;
  & a {
    color: #000;
  }
  & a:hover {
    color: #0984e3;
  }
`;

export const BoardPath = styled.div`
  font-size: 15px;

  & .board_path {
    color: #888888;
  }

  & .board_path:hover {
    color: #000;
  }

  &. active {
    color: #000;
  }
`;

export const Table = styled.table`
  /* border: 1px solid black; */
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  border: none;
  margin-top: 8px;
  & tr {
    border: none;
    border-bottom: 1px solid #ced6e0;
  }
  & tr:last-child {
    border: none;
  }

  th,
  td {
    text-align: center;
    border: none;
  }
  & td:first-child {
    //border: 1px solid green;
    padding: 8px 50px 8px 8px;
    text-align: left;
    position: relative;
  }
  & td:nth-child(2) {
    //color: blue;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
  }
  & td:nth-child(3) {
    color: orange;
  }
  & td:last-child {
    padding: 15px;
    text-align: right;
  }
`;
export const BoardTitle = styled.div`
  max-width: 200px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BoardHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: sticky;
  top: 10px;
`;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
`;

export const WriteButton = styled.button`
  color: #000;
  position: absolute;
  bottom: 0;
  right: 0;
  background: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    color: #0984e3;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 100%;
`;

export const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  height: 100%;
  padding: 0 30%;
  & Button {
    border: none;
    background-color: transparent;
    border-radius: 3px;
    color: #000;
    font-size: 14px;
    /* padding: 5px; */
    width: 32px;
    height: 32px;
    margin: 0 4px;
    text-align: center;
  }

  & button:hover {
    border: 2px dashed #0984e3;
    cursor: pointer;
  }
  & .active {
    background-color: #0984e3;
    color: #fff;
  }
`;
