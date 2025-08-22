import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import '../App.css'

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let NewBtn = styled.button(YellowBtn);

let Box = styled.div`
  background : grey;
  padding : 20px;  
`



function Detail({ shoes }) {
  let [visible, setVisible] = useState(true);
  let [warning, setWarning] = useState(false);
  let [num, setNum] = useState(false);
  let [tab, setTab] = useState(0);

  useEffect(() => {
    let timer = setTimeout((e) => { setVisible(false) }, 2000);
    if (isNaN(num)) {
      setWarning(true)
    } else {
      setWarning(false)
    }

    return () => {
      console.log(1);
      clearTimeout(timer)
    }
  }, [num])

  /*
    useEffect(() => {})
    useEffect(() => {},[])
    useEffect(() => {
      return ()=>{},[]}
  */

  let [count, setCount] = useState(0);

  let { id } = useParams();
  let selected = shoes.find(item => { return item.id == id });
  return (
    <div className="container">
      {visible == true ? <div className="alert alert-warning">2초이내 구매시 할이</div> : null}
      {warning == true ? <div className="alert alert-warning">경고 : 숫자만 입력하세요<div className=""></div></div> : null}
      {/* <input onChange={(e) => {
        if (isNaN(e.target.value)) {
          setWarning(true);
        } else {
          setWarning(false);
        }
      }}></input> */}
      <input
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <button onClick={() => { setCount(count + 1) }}>버튼</button>
      <NewBtn>버튼 </NewBtn>
      <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes' + (selected.id + 1) + '.jpg'} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{selected.title}</h4>
          <p>{selected.content}</p>
          <p>{selected.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div>
  )
}


function TabContent({ tab }) {
  let [fade, setFade] = useState('')
  useEffect(() => {

    let a = setTimeout(() => { setFade('end') }, 100)
    return () => {
      setFade('')
      clearTimeout(a);
    }
  }, [tab])
  return <div className={`start ${fade}`}>
    {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
  </div>
}
export default Detail;