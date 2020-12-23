import symbolMap from './symbolMap';
import './CardSymbols.scss';

function useSymbols(text = '') {
    const symbols = text.split(/(\{(?:\D|[A-Z0-9]+|[A-Z0-9]+\/[A-Z0-9]+)\})/gm);
    return symbols.map(s => (symbolMap[s] ? symbolMap[s] : s)).join('');
}

export default useSymbols;
