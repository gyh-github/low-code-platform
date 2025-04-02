import './index.less';
const Link = (props) => {
    const text = props?.text || '超链接';
    const style = props?.style || {};
    return (<a style={{ ...style }} href={props?.url || 'javascript:void(0)'} className="link">{text}</a>)
}

export default Link;