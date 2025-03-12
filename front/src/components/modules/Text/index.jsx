import './index.less';
const Text = (props) => {
    const text = props?.label || '文字';
    const style = props?.style || {};
    return (<div style={{ ...style }} className="text">{text}</div>)
}

export default Text;