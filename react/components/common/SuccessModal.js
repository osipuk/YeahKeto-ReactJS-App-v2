import React from 'react';

import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: 'all .5s',
    zIndex: 100,
  },
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class SuccessModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.props.visible === true) {
      this.openModal();
    } else {
      // this.closeModal();
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    if (this.props.title) {
      this.setState({ modalIsOpen: false });
      this.props.onClose();
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className="animated-modal text-center p-5 fancybox-content success-modal"
          style={this.props.style}
        >
          {this.props.title && (
            <button
              className="fancybox-close-small"
              title="Close"
              onClick={this.closeModal}
            >
              <svg viewBox="0 0 32 32">
                <path d="M10,10 L22,22 M22,10 L10,22" />
              </svg>
            </button>
          )}
          <h2>{this.props.title || 'Success!'}</h2>
          <p>
            {this.props.message}
            <br />
            {this.props.title && (
              <div>
                Tip: you may try another card or call{' '}
                <a href="tel:+18772795390">(877) 279-5390</a>
              </div>
            )}
          </p>
          {!this.props.title && (
            <p className="mb-0" style={{ paddingTop: '10px' }}>
              <svg
                width="150"
                height="150"
                viewBox="0 0 510 510"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  fill="#fff"
                  d="M150.45,206.55l-35.7,35.7L229.5,357l255-255l-35.7-35.7L229.5,285.6L150.45,206.55z M459,255c0,112.2-91.8,204-204,204 S51,367.2,51,255S142.8,51,255,51c20.4,0,38.25,2.55,56.1,7.65l40.801-40.8C321.3,7.65,288.15,0,255,0C114.75,0,0,114.75,0,255 s114.75,255,255,255s255-114.75,255-255H459z"
                />
              </svg>
            </p>
          )}
        </div>
      </Modal>
    );
  }
}

export { SuccessModal };
