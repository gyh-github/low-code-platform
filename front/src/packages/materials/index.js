import plateConfig from '@/packages/utils/plateConfig.jsx';
import vanSwipe from "./vanSwipe";
export default () => {
    vanSwipe();
    const { componentList } = plateConfig()
    console.log(componentList)
    console.log('asdasdas')
}