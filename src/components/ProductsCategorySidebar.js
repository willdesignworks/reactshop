import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductsCategorySidebar({ activeAccordion }) {
  const [openAccordion, setOpenAccordion] = useState(activeAccordion);

  const toggleAccordion = (accordionId) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  // 更新展開的手風琴卡片
  useEffect(() => {
    setOpenAccordion(activeAccordion);
  }, [activeAccordion]);

  return (
    <>
      <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
        <div className="card border-0">
          <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" 
               onClick={() => toggleAccordion('one')}>
            <div className="d-flex justify-content-between align-items-center pe-1">
              <h4 className="mb-0">商品</h4>
              <i className={`fas fa-chevron-down ${openAccordion === 'one' ? 'rotate' : ''}`}></i>
            </div>
          </div>
          <div id="collapseOne" className={`collapse ${openAccordion === 'one' ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="card-body py-0">
              <ul className="list-unstyled">
              <li>
                  <Link to='/products' className="py-2 d-block text-muted">所有商品</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card border-0">
          <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" 
               onClick={() => toggleAccordion('two')}>
            <div className="d-flex justify-content-between align-items-center pe-1">
              <h4 className="mb-0">服飾</h4>
              <i className={`fas fa-chevron-down ${openAccordion === 'two' ? 'rotate' : ''}`}></i>
            </div>
          </div>
          <div id="collapseTwo" className={`collapse ${openAccordion === 'two' ? 'show' : ''}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="card-body py-0">
              <ul className="list-unstyled">
                <li>
                  <Link to='/categoryshirts' className="py-2 d-block text-muted">所有服飾</Link>
                </li>
                <li>
                  <Link to='/categorypants' className="py-2 d-block text-muted">所有褲子</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card border-0">
          <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" 
               onClick={() => toggleAccordion('three')}>
            <div className="d-flex justify-content-between align-items-center pe-1">
              <h4 className="mb-0">配件</h4>
              <i className={`fas fa-chevron-down ${openAccordion === 'three' ? 'rotate' : ''}`}></i>
            </div>
          </div>
          <div id="collapseThree" className={`collapse ${openAccordion === 'three' ? 'show' : ''}`} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="card-body py-0">
              <ul className="list-unstyled">
                <li>
                  <Link to='/categorygoods' className="py-2 d-block text-muted">所有配件</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCategorySidebar;