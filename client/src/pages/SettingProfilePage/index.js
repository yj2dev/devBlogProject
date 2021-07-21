import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import {
  Container,
  Label,
  Input,
  Title,
  Line,
  NicknameContainer,
  Message,
  Error,
  ErrorInput,
  EditPicket,
  EditPrictureSection,
  UpdateNicknameButton,
  SettingProfileContainer,
} from "./styled";
import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import axios from "axios";
import { RiImageEditFill } from "react-icons/ri";

import Menu from "../../components/Menu";
//유효성 검사 12글자 이하, 공백 여부 추가 예정
//기존의 닉네임과 같은지 검사

function SettingProfilePage({ history }) {
  const user = useSelector((state) => state.user);
  const [userNickname, setUserNickname] = useState("");
  const [errorUpdateNickname, setErrorUpdateNickname] = useState(false);
  const [successUpdateNickname, setSuccessUpdateNickname] = useState(false);

  const onChangeUserNickname = (e) => {
    setUserNickname(e.target.value);
  };

  const onClickUpdateNickname = () => {
    const payload = {
      _id: user.authStatus._id,
      changeNickname: userNickname,
    };
    console.log("payload >> ", payload);

    axios
      .post("/api/users/updatenickname", payload)
      .then(({ data }) => {
        setSuccessUpdateNickname(true);
        console.log("data >> ", data);
        setTimeout(() => {
          setSuccessUpdateNickname(false);
          history.push("/setting/profile");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileSeletor = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <Container>
      <Title>프로필 설정</Title>
      <Line />
      <SettingProfileContainer>
        <div>
          <NicknameContainer>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={userNickname}
              onChange={onChangeUserNickname}
            ></Input>
            <Message>
              닉네임은 12글자 이하로 입력가능하며 공백은 허용하지 않습니다.
            </Message>
            {successUpdateNickname && (
              <Message style={{ color: "#009432" }}>
                닉네임이 성공적으로 변경되었습니다. <br />
                페이지를 새로고침하면 반영되며 5초 후에 자동으로 새로고침
                됩니다.
              </Message>
            )}
            <UpdateNicknameButton onClick={onClickUpdateNickname}>
              닉네임 변경
            </UpdateNicknameButton>
          </NicknameContainer>
        </div>

        <div>
          <Label>프로필 사진</Label>

          <EditPrictureSection>
            <Gravatar
              email={user.authStatus.email}
              size={250}
              default="wavatar"
              style={{
                width: "250px",
                height: "250px",
                marginRight: "12px",
                borderRadius: "50%",
                border: "1px solid #d0d7de",
              }}
            />
            <EditPicket>
              <RiImageEditFill
                style={{ fontSize: "20px", marginRight: "4px" }}
              />
              수정
            </EditPicket>
          </EditPrictureSection>

          <input type="file" onChange={onFileSeletor} />
        </div>
      </SettingProfileContainer>
    </Container>
  );
}

export default withRouter(SettingProfilePage);
