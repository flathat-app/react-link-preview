import React, { useState, useEffect } from 'react';

var styles = {"link-preview-section":"_3elLK","animated-background":"_Z-Tng","link-image-loader":"_13bre","img":"_1Igjx","placeHolderShimmer":"_yKlsy","link-description":"_3IjjD","domain":"_3Y4Nu","link-url":"_CZu1J","link-url-loader":"_2immM","link-data":"_2bWne","link-title":"_35AKc","link-data-loader":"_322CG","p1":"_3rFBW","p2":"_L7vLm","link-image":"_3EjBn"};

var isValidUrl = function isValidUrl(url) {
  var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  var validUrl = regex.test(url);
  return validUrl;
};
function LinkPreview(props) {
  var _useState = useState(true),
    loading = _useState[0],
    setLoading = _useState[1];
  var _useState2 = useState({}),
    preview = _useState2[0],
    setPreviewData = _useState2[1];
  var _useState3 = useState(false),
    isUrlValid = _useState3[0],
    setUrlValidation = _useState3[1];
  var url = props.url,
    width = props.width,
    maxWidth = props.maxWidth,
    marginTop = props.marginTop,
    marginBottom = props.marginBottom,
    marginRight = props.marginRight,
    marginLeft = props.marginLeft,
    onClick = props.onClick,
    render = props.render;
  var api = 'https://lpdg.herokuapp.com/parse/link';
  var style = {
    width: width,
    maxWidth: maxWidth,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft
  };
  useEffect(function () {
    var fetchData = function fetchData() {
      try {
        var fetch = window.fetch;
        if (isValidUrl(url)) {
          setUrlValidation(true);
        } else {
          return Promise.resolve({});
        }
        setLoading(true);
        return Promise.resolve(fetch(api, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          })
        })).then(function (response) {
          return Promise.resolve(response.json()).then(function (data) {
            setPreviewData(data);
            setLoading(false);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    fetchData();
  }, [url]);
  if (!isUrlValid) {
    console.error('LinkPreview Error: You need to provide url in props to render the component');
    return null;
  }
  if (render) {
    return render({
      loading: loading,
      preview: preview
    });
  } else if (loading) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: styles['link-preview-section'],
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      className: styles['link-description']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.domain
    }, /*#__PURE__*/React.createElement("span", {
      className: (styles['animated-background'])
    }, "facebook.com")), /*#__PURE__*/React.createElement("div", {
      className: styles['link-data-loader']
    }, /*#__PURE__*/React.createElement("div", {
      className: (styles['animated-background'])
    }, "Shashank Shekhar"), /*#__PURE__*/React.createElement("div", {
      className: (styles['animated-background'])
    }, "This is some description"))), /*#__PURE__*/React.createElement("div", {
      className: styles['link-image-loader']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.img
    }))));
  } else {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: styles['link-preview-section'],
      style: style,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: styles['link-description']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.domain
    }, /*#__PURE__*/React.createElement("span", {
      className: styles['link-url']
    }, preview.domain)), /*#__PURE__*/React.createElement("div", {
      className: styles['link-data']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles['link-title']
    }, preview.title), /*#__PURE__*/React.createElement("div", {
      className: styles['link-description']
    }, preview.description))), /*#__PURE__*/React.createElement("div", {
      className: styles['link-image']
    }, preview.img && /*#__PURE__*/React.createElement("img", {
      src: preview.img,
      alt: preview.description
    }))));
  }
}
LinkPreview.defaultProps = {
  onClick: function onClick() {},
  width: '90%',
  maxWidth: '700px',
  marginTop: '18px',
  marginBottom: '18px',
  marginRight: 'auto',
  marginLeft: 'auto'
};

export default LinkPreview;
//# sourceMappingURL=index.modern.js.map
