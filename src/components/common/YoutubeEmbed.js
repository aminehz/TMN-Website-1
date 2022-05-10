import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, width }) => (
  <div style={{position:'relative',height:0,overflow:'hidden',maxWidth:'100%',paddingBottom:'56.25%'}}>
    <iframe
      style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
