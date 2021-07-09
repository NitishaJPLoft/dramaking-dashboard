import React, { useEffect } from 'react';
import './dropzone.css';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const audioThumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 310,
  height: 65,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function Dropzone(props) {
  const {
    acceptType, caption, title, files, setFiles
  } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptType,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={acceptType === 'audio/*' ? audioThumb : thumb} key={file.name}>
      <div style={thumbInner}>
        {acceptType === 'audio/*' ? (
          <audio controls>
            <source src={file.preview} type="audio/mp3" />
            <track default kind="captions" srcLang="en" src={file.preview} />
          </audio>
        ) : (
          <img
            src={file.preview}
            style={img}
            alt="img"
          />
        )
        }

      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <aside>
        <h4>{title}</h4>
        {thumbs}
      </aside>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{caption}</p>
      </div>
    </section>
  );
}

Dropzone.propTypes = {
  acceptType: PropTypes.any.isRequired,
  caption: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  files: PropTypes.any.isRequired,
  setFiles: PropTypes.any.isRequired,
};

export default Dropzone;
