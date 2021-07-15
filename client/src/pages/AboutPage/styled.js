import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & hr {
    width: 100%;
    padding:0px;
    margin:0px;
  }

  }
`;

export const Input = styled.input`
  width: 391px;
  padding: 5px 0px 5px 7px;
  font-size: 20px;
  border-radius: 3px;
  border: 1px solid #c3cfe0;
  transition: 0.3s;
  /* margin-top: 4px; */
  &:focus {
    box-shadow: 0px 0px 5px 1px #7f8fa6;
  }
`;

export const Label = styled.label`
  padding: 7px;
  font-size: 18px;
  font-weight: 800;
  color: #000;
  position: relative;
  display: inline-block;
  top: -8px;
`;

export const SubmitButton = styled.button`
  float: right;
  font-weight: 800;
  width: 80px;
  height: 30px;
  border-radius: 3px;
  background: #cce6ff;
  border: 1px solid #c3cfe0;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 1px #73b7fa inset;
  }
  &:active {
    background: #73b7fa;
    color: #fff;
  }
`;

export const CancelButton = styled.button`
  float: right;
  font-weight: 800;
  width: 80px;
  height: 30px;
  border-radius: 3px;
  background: #ffe3de;
  border: 1px solid #c3cfe0;
  transition: 0.1s;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 1px #ff9785 inset;
  }
  &:active {
    background: #ff9785;
    color: #fff;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  border: 1px solid #808e9b;
  display: inline-block;
  color: #000;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0px 0px 5px 1px #7f8fa6;
  margin: 8px;
  position: relative;
  min-width: 200px;
  max-width: 300px;

  }
`;

export const ListContainer = styled.div`
  margin: 4px 8px;
`;

export const List = styled.div`
  margin: 4px 0;
`;
export const CategoryId = styled.div`
  display: none;
  color: green;
`;

export const CategoryButton = styled.button`
  width: 300px;
  font-weight: 800;
  height: 30px;
  border-radius: 3px;
  background: #dff9fb;
  border: 1px solid #7f8fa6;
  transition: 0.3s;
  position: absolute;
  bottom: 35px;
  &:hover {
    background: #d2dae2;
    cursor: pointer;
  }
  &:active {
    background: #808e9b;
    box-shadow: 0px 0px 3px 1px #ea8685 inset;
    color: #fff;
  }
`;

export const ListButton = styled.button`
  color: #747d8c;
  position: absolute;
  right: 8px;
  top: -2px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  font-weight: 800;
  border: none;
  background-color: transparent;
  transition: 0.1s;
  &:hover {
    color: #000;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  color: red;
  /* border: 1px solid black; */
  margin: 6px 27px 6px 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
