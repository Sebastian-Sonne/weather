interface SettingButtonProps {
    value: string,
    location: 'left' | 'center' | 'right',
    selected?: boolean,
    onClick?: any,
}
const SettingButton: React.FC<SettingButtonProps> = ({ value, location, selected, onClick }): JSX.Element => {
    const borderClass = `border-2 ${selected ? 'border-gray-600 dark:border-white' : 'border-secondary-l dark:border-secondary-d'} ${location === 'left' ? 'rounded-l-lg' : location === 'center' ? 'border-l-0' : 'border-l-0 rounded-r-lg'}`;
    const colorClass = `${selected ? 'bg-gray-600 text-white dark:bg-bg-light dark:text-black' : 'hover:bg-icon dark:hover:bg-secondary-d'}`;

    return (
        <button onClick={onClick} disabled={selected} className={`font-semibold px-4 py-2 w-32 ${colorClass} ${borderClass} transition-colors`}>
            {value}
        </button>
    );
}
export default SettingButton