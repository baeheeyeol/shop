import { createContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.jsx'
import Cart from './routes/Cart.jsx'
import axios from 'axios'

export let Context1 = createContext();

function App() {
  const [count, setCount] = useState(0)

  let [shoes, setShoes] = useState(data);
  let [cnt, setCnt] = useState(2);
  let [visible, setVisible] = useState(true);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12])

  return (
    <div className='App'>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>
      <Routes>
        <Route path="/" element={
          <>
            <div>메인페이지임</div>
            <div className="main-bg" style={{ backgroundImage: "url('/bg.png')" }} />
            <div className="container">
              <div className="row">
                {
                  shoes.map((shoe, index) => {
                    return <ShoeList shoe={shoe} key={shoe.id}></ShoeList>
                  })
                }

              </div>
              {loading == true ?
                <div>로딩중입니다...</div> : null
              }
            </div>
            {visible == true ?
              <button onClick={() => {
                if (cnt >= 4) {
                  setVisible(false)
                } else {
                  setLoading(true);
                  axios.get('https://codingapple1.github.io/shop/data' + cnt + '.json')
                    .then((결과) => {
                      let copy = [...shoes]
                      copy = copy.concat(결과.data);
                      setShoes(copy)
                      setCnt((prev) => prev + 1);
                      setLoading(false);
                    })
                    .catch(() => {
                      setLoading(false);
                      console.log('실패함ㅅㄱ')
                    })
                }
              }}>더보기</button> : null
            }
          </>
        }>

        </Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고 }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="/cart" element={<Cart></Cart>}> </Route>
        <Route path="/about" element={<About />} >
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/event" element={<Event />} >
          <Route path="one" element={<One></One>} />
          <Route path="two" element={<Two></Two>} />
        </Route>

        <Route path="*" element={<div>없는페이지요</div>} />
      </Routes>
    </div>
  )
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>

  )
}
function One() {
  return (
    <div>첫 주문시 양배추즙 서비스</div>
  )
}
function Two() {
  return (
    <div>생일기념 쿠폰받기</div>
  )
}
function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
function ShoeList({ shoe }) {
  let url = 'https://codingapple1.github.io/shop/shoes' + (shoe.id + 1) + '.jpg'
  return (
    <div className="col-md-4">
      <Link to={`/detail/${shoe.id}`}>
        <img src={url} width="80%" />
      </Link>
      <h4>{shoe.title}</h4>
      <p>{shoe.content}</p>

    </div>
  )
}
export default App
