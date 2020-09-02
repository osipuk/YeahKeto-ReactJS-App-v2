import React, { PureComponent } from 'react';

/**
 * @class Modal
 * @extends {PureComponent}
 * @description popup modal: closes which clicked outside
 */
class Modal extends PureComponent {
  render() {
    return (
      // eslint-disable-next-line
      <div
        className="modal fade in"
        id="popupModal"
        role="dialog"
        style={{
          display: 'block',
        }}
        onClick={this.props.onClose}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onClose}
              >
                <span aria-hidden="true">
                  <svg
                    viewport="0 0 20 20"
                    width="20"
                    height="20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1"
                      y1="20"
                      x2="20"
                      y2="1"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <line
                      x1="1"
                      y1="1"
                      x2="20"
                      y2="20"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </button>
              <h3 className="modal-title">{this.props.children[0]}</h3>
            </div>
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  }
}

export { Modal };
