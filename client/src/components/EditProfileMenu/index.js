import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, List } from "./styled";
import axios from "axios";

import Menu from "../../components/Menu";
import AlertModal from "../../components/AlertModal";
import ImageCrop from "../../components/ImageCrop";

function EditProfileMenu({ history, show, close, style }) {
  const user = useSelector((state) => state.user);

  const [showImageCropModal, setShowImageCropModal] = useState(false);
  const [showResetProfileModal, setShowResetProfileModal] = useState(false);

  const onClickImageCropModal = () => {
    close(); //버그 있음 close를 사용안하면 모달 바깥영역을 클릭할 시 메뉴 모달도 같이 닫히지만 모달의 취소버튼으 누를시 메뉴가 열려있다, close를 사용하면 이와 반대로 동작
    setShowImageCropModal((prev) => !prev);
  };

  const onCloseImageCropModal = () => {
    close();
    setShowImageCropModal(false);
  };

  const onClickResetProfileModal = () => {
    close();
    setShowResetProfileModal((prev) => !prev);
  };

  const onCloseResetProfileModal = () => {
    close();
    setShowResetProfileModal(false);
  };

  const onSubmitResetProfile = () => {
    const payload = {
      _id: user.authStatus._id,
      imagePath: user.authStatus.imagePath,
    };
    axios
      .post("/api/users/reset/image", payload)
      .then(({ data }) => {
        console.log("data >> ", data);
        close();
        history.push("/setting/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Menu show={show} close={close} style={style}>
        <List>
          <ul>
            <li onClick={onClickImageCropModal}>프로필 사진 업로드</li>
            <li onClick={onClickResetProfileModal}>기본 이미지로 변경</li>
          </ul>
        </List>
      </Menu>
      <AlertModal
        show={showResetProfileModal}
        close={onCloseResetProfileModal}
        option="danger"
        modalHeader="프로필 이미지 초기화 안내"
        content="기존의 프로필 이미지는 삭제되며 회원가입 시 생성됬던 이미지로 변경됩니다. 기본 프로필 이미지로 바꾸시겠습니까?"
        style={{ width: "300px" }}
        confirm={onSubmitResetProfile}
      />
      <ImageCrop show={showImageCropModal} close={onCloseImageCropModal} />
    </Container>
  );
}

export default withRouter(EditProfileMenu);
