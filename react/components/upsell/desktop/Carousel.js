import React from 'react';

class Carousel extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <p className="pkg-hding">{props.title}</p>
        <div className="pkg-container dsplay">
          {props.upsells.map((upsell, index) => (
            <div key={String(index)} className={upsell.boxClassName}>
              <p className="pkgbox-hding">{upsell.title}</p>
              <img
                src={`/static/desktop/images/${upsell.img}`}
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
          ))}
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
