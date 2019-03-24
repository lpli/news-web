//BEGIN allow image alignment styles
const VideoFormatAttributesList = [
    'height',
    'width',
    'style'
];
    
var BaseVideoFormat = window.Quill.import('formats/video');
export class VideoFormat extends BaseVideoFormat {
  static create(value) {
    let node = document.createElement('div');
    node.setAttribute("class",'ql-video');
    let childNode = document.createElement("iframe");
    childNode.setAttribute('frameborder', '0');
    childNode.setAttribute('allowfullscreen', true);
    childNode.setAttribute('src', this.sanitize(value));
    node.appendChild(childNode);
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
