const VideoFormatAttributesList = [
    'height',
    'width'
];
const VideoFormatAttr = {
    height:300,
    width:400
}
const align = {
    'left':'ql-align-left',
    'right':'ql-align-right',
    'center':'ql-align-center'
}
var BaseVideoFormat = window.Quill.import('formats/video');
export class VideoFormat extends BaseVideoFormat {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src',this.sanitize(value.src));
    node.setAttribute('width',value.width||VideoFormatAttr.width);
    node.setAttribute('height',value.height||VideoFormatAttr.height);
    if(align[value.align]){
        node.classList.add(align[value.align]);
    }
    return node;
  }
  static formats(domNode) {
    return VideoFormatAttributesList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (VideoFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}