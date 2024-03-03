import React from 'react';
import { Button } from "./Button";

export class ViewModal extends React.Component {
  render() {
    return (
      <div className="ViewModal">
        <div className="modal fade" id="viewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="viewModal" aria-hidden="true">
          <div className={ "modal-dialog modal-dialog-centered " + this.props.customclass }>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="viewModal">{ this.props.title }</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex px-3">
                <table className='w-100'>
                  <tbody>
                    { this.props.body }
                  </tbody>
              </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
