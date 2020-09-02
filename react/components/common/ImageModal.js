import React, { PureComponent } from 'react';

/**
 * @class Modal
 * @extends {PureComponent}
 * @description popup modal: closes which clicked outside
 */
class ImageModal extends PureComponent {
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
          <div
            style={{ backgroundColor: 'transparent' }}
            className="modal-content"
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export { ImageModal };
