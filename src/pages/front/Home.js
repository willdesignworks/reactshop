import { Link } from "react-router-dom";
import RelatedProducts from "../../components/RelatedProducts";

function Home() {
  return (
    <>
    <div className="position-relative">
      <div className="position-absolute indextopbg"></div>

      <div className="container d-flex flex-column" style={{minHeight: '100vh',}}>
        <div className="row justify-content-center my-auto">
            <div className="col-md-4 text-center">
              <h2>Lorem ipsum.</h2>
              <p className="text-muted mb-0">此為範例網站, 不會有真的購物行為</p>
              <Link to='/products' className="btn btn-dark rounded-0 mt-6">
              選購商品
              </Link>
            </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-5">
        <RelatedProducts />
      </div>
    </div>
    <div className="bg-light mt-7">
      <div className="container">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <p className="my-2">
                  XRAGE（エックスレージ）は2014年に渋谷で立ち上げたブランドであり、
                  </p>
                  <p className="my-2">
                  「仲間」を要素に、日本・台湾のデザイナーと共に持ちつづけるものである。
                  </p>
                  <p className="my-2">
                  漢字をモチーフにし、和風スタイルの強さを表すことを心掛けています。
                  </p><br/><br/>
                  <p className="my-2">
                  XRAGE（エックスレージ）2014年於東京澀谷成立，集結日本、台灣設計師共同創作。
                  </p>
                  <p className="my-2">
                  日文夥伴「仲間(なかま)」為品牌精神標語，擅長以漢字為設計元素，展現強烈日式風格，將傳統與當代流行為結合。
                  </p>
                  <p className="my-4"><small>—XRAGE（エックスレージ）—</small></p>
                </div>
              </div>
            </div>
    </div>
    <div className="container my-7">
      <div className="row">
        <div className="col-md-6">
          <img src="https://shoplineimg.com/5b306d4c9a76f01953000055/66fa7300ed6d0e000ff213d0/800x.webp?source_format=jpeg" alt="" className="img-fluid" />
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">黃金櫃斜相機包&千年積木包</h4>
          <p className="text-muted">
          《遊戲王》卡牌遊戲25週年紀念！睽違三年再度聯名！ <br/>
          獨家推出大量經典卡牌核心設計服飾<br/>
          以世界第一的刺繡技術呈現絕佳的視覺效果<br/>
          一起回到那年手握著卡片與決鬥者對戰的美好回憶裡。
          </p>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-between mt-4">
        <div className="col-md-6">
          <img src="https://shoplineimg.com/5b306d4c9a76f01953000055/66cc438741ebc900193018fc/800x.webp?source_format=jpg" alt="" className="img-fluid" />
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">泡泡龍 橫須賀刺繡外套</h4>
          <p className="text-muted">
          「泡泡龍」是1986年由日本TAITO公司所推出的電子遊戲<br/>
          主角為被魔法變成可愛恐龍的雙胞胎：<br/>
          巴比與波比 吐著泡泡擊敗各式敵人<br/>
          XRAGE將8位元復古風格以細緻刺繡呈現遊戲經典場景。
          </p>
        </div>
      </div>
    </div>
    {/*<div className="bg-light py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
          <p className="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div className="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" className="form-control rounded-0" placeholder="" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    </>
  );
};

export default Home;