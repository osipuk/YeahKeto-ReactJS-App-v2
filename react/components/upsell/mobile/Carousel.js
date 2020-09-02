import React from 'react';
import Head from 'next/head';
import Slider from 'react-slick';

class Carousel extends React.PureComponent {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const { props } = this;
    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <p className="pkg-hding">{props.title}</p>
        <div className="pkg-container dsplay">
          <div className="slider">
            <Slider {...settings}>
              {props.upsells.map((upsell, index) => (
                <div key={upsell.id} className={`slide${index + 1}`}>
                  <div className={upsell.boxClassName}>
                    <p className="pkgbox-hding">{upsell.title}</p>
                    <img
                      src={`/static/mobile/images/${upsell.img}`}
                      alt=""
                      className="pkgbox-btl"
                    />
                    <p className="pkgbox-txt">
                      {upsell.boxTxt}
                      <br />
                      for only<br />
                      <span className="span2">{upsell.price}</span>
                      <br />
                      {upsell.discount}
                    </p>
                    <a
                      href="javascript:void(0)"
                      className="select"
                      onClick={() => props.onUpgrade(upsell.id)}
                    >
                      Select
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <p className="s1txt2">
          This offer is promotional and will not last. Act now to enjoy this
          discount!
        </p>
      </React.Fragment>
    );
  }
}

export { Carousel };
