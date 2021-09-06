import './FieldGroup.scss';

export default function FieldGroup({ className = '', children = [] }) {
    return <div className={`FieldGroup ${className}`}>{children}</div>;
}
