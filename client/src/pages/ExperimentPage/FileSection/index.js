import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { Container, Table1, Table2, Image } from './styled';

function FileSection({ history }) {
  const resetPage = () => {
    history.push('/experiment');
  };
  const [blobURL, setBlobURL] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [outputURL1, setOutputURL1] = useState(true);
  const [outputURL2, setOutputURL2] = useState(true);
  const [outputURL3, setOutputURL3] = useState(false);

  function inputFile(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    let blob = new Blob([file], {
      type: 'image/png',
    });

    console.log('[Input] new Blob >> ', blob);

    const blobURL = window.URL.createObjectURL(blob);
    setBlobURL(window.URL.createObjectURL(blob));
    const fileURL = window.URL.createObjectURL(file);
    console.log('convert blob >> ', blobURL);
    console.log('convert file >> ', fileURL);

    formData.append('file', blob);
    formData.append('userName', 'angryduck23');
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log('formData >> ', formData);

    axios
      .post('/api/test/save', formData, config)
      .then(({ data }) => {
        console.log('save file success...');
        console.log('data >> ', data);
      })
      .catch((err) => {
        console.log('save file failed...');
      });
  }

  const outputFile = (e) => {
    const reader = new FileReader();
    // const readAsDataURL = reader.readAsDataURL(e.target.files[0]);
    // const creteObjectURL = window.URL.createObjectURL(e.target.files[0]);
    setOutputURL1(reader.readAsDataURL(e.target.files[0]));
    setOutputURL2(window.URL.createObjectURL(e.target.files[0]));
  };

  const getBlobFile = () => {
    axios
      .post('/api/test/sendfile')
      .then(({ data }) => {
        console.log('data >> ', data);
        setOutputURL3(data);

        const fd = new FormData();

        fd.append('img', data);
        console.log('fd >>', fd);
        const reader = new FileReader();
        // let Uint8Arrayblob = new Blob(new Uint8Array(data));
        let blob = new Blob(data);
        let file = reader.readAsArrayBuffer(blob);
        // console.log("data Unit8Array blob >> ", Uint8Arrayblob);
        console.log('data blob >> ', blob);
        console.log('blob to file >> ', file);

        // console.log(window.URL.createObjectURL(data));
        // setOutputURL2(window.URL.createObjectURL(data));

        // const reader = new FileReader();
        // console.log(reader.readAsDataURL(data));
        // setOutputURL1(reader.readAsDataURL(data));
      })
      .catch((err) => {
        console.log('err >> ', err);
      });
  };

  console.log('outputURL1 >> ', outputURL1);
  console.log('outputURL2 >> ', outputURL2);
  // console.log("outputURL3 >> ", outputURL3);

  return (
    <Container>
      <Table1>
        <button onClick={resetPage}>Page Reset</button>
        {/*<button onClick={getBlobFile}>파일 가져오기</button>*/}
        <h3>File 처리</h3>
        <h4>이미지 미리보기</h4>
        <input type="file" onChange={inputFile} />
        {/*<h4>blob 데이터 입력 후 출력</h4>*/}
        {/*<input type="file" onChange={outputFile} />*/}
      </Table1>
      <Table2>
        <Image>
          <span>
            Save blob URL
            {blobURL}
          </span>
          <img src={`${blobURL}`} width="150px" height="150px" />
        </Image>
        <Image>
          <span>1</span>
          {outputURL1 && (
            <img src={`${outputURL1}`} width="150px" height="150px" />
          )}
        </Image>
        <Image>
          <span>2</span>
          {outputURL2 && (
            <img src={`${outputURL2}`} width="150px" height="150px" />
          )}
        </Image>
        <Image>
          <span>3</span>
          {outputURL3 && (
            <img
              src={`data:image/png;base64,${outputURL3}`}
              width="150px"
              height="150px"
            />
          )}
        </Image>
      </Table2>
    </Container>
  );
}

export default withRouter(FileSection);
