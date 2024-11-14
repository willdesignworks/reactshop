import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="htc__foooter__area">
            <div className="container">
                <div className="row footer__container clearfix">
                    <div className="col-md-6 col-lg-3 col-sm-6">
                        <div className="ft__widget">
                            <div className="ft__logo">
                                <Link to="/">
                                    <img src="https://shoplineimg.com/5b306d4c9a76f01953000055/5b309ae210abb98917000900/x140.webp?source_format=png" alt="footer logo" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
                        <div className="ft__widget">
                            <h2 className="ft__title">
                            台灣1號店 「XRAGE 西門店」
                              
                            </h2>
                            <div className="footer__inner">
                                <p><Link to="https://maps.app.goo.gl/yYQJgNbrAQ4bMV3TA?g_st=ic" target={"_blank"}>台北西門町誠品武昌3F</Link></p>
                                <p>地址：台北市萬華區武昌街二段77號3F</p>
                                <p>營業時間：11:30〜22:30</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
                        <div className="ft__widget">
                            <h2 className="ft__title">
                            台灣3號店 「XRAGE 信義店」
                            </h2>
                            <div className="footer__inner">
                                <p><Link to="https://maps.app.goo.gl/eV7Jkj8WJjFVwhdx7?g_st=ic" target={"_blank"}>新光三越台北信義新天地A11 3F</Link></p>
                                <p>地址：台北市萬華區武昌街二段77號3F</p>
                                <p>營業時間：11:30〜22:30</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
                        <div className="ft__widget">
                            <h2 className="ft__title">社群</h2>
                            <ul className="social__icon">
                                <li>
                                  <Link to="https://www.instagram.com/xrage_jp/" target={"_blank"}>
                                    <i className="zmdi zmdi-instagram"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="https://www.facebook.com/XRAGECREW/" target={"_blank"}>
                                    <i className="zmdi zmdi-facebook"></i>
                                  </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="htc__copyright__area">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="copyright__inner">
                                <div className="copyright">
                                    <p>COPYRIGHT © 2024 XRAGE CO., LTD. ALL RIGHTS RESERVED.此網站是範例, 並沒有真正的購物行為</p>
                                </div>
                                <ul className="footer__menu">
                                    <li>
                                      <Link to="/">首頁</Link>
                                    </li>
                                    <li>
                                      <Link to="about" onClick={() => window.scrollTo(0, 0)}>品牌介紹</Link>
                                    </li>
                                    <li>
                                      <Link to="products" onClick={() => window.scrollTo(0, 0)}>全部商品</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  );
};

export default Footer;