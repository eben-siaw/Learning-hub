/*
import React, { Component } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import Chat from "../../../StudentPage/Chat/Chat";
import { fetchSingleStream } from "../../../../actions";
import { withRouter, Link } from "react-router-dom";

class ViewerStreamWatch extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return "Preparing stream...";
    }

    const { title, description } = this.props.stream;

    return (
      <div className="stream-wrapper">
        <div style={{ padding: "20px 0" }}>
          <Link to="/dashboard/streams" class="back-button">
            <i className="ion-ios-arrow-back"></i>
            <span>Go Back</span>
          </Link>
        </div>
        <div>
          <video
            ref={this.videoRef}
            style={{ width: "100%", height: 400 }}
            controls={true}
          />
          <h3 className="title">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="comments-wrapper">
          <small className="comments-tag">
            <b>Comments:</b>
          </small>
          <Chat />
        </div>
        <style jsx>{`
          .title {
            color: var(--color-2);
            padding: 15px 0px;
          }

          .stream-wrapper {
            max-height: 90vh;
            overflow: auto;
          }
          .stream-wrapper::-webkit-scrollbar {
            display: none;
          }

          .comments-wrapper {
            padding: 20px 0;
          }

          .comments-tag {
            color: var(--color-3);
            background: var(--color-3-transparent);
            padding: 5px 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStream: (id) => dispatch(fetchSingleStream(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewerStreamWatch)
);
 */