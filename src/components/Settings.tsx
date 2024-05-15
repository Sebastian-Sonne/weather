const Settings = (): JSX.Element => {

    return (
        <div className="w-full bg-component-light dark:bg-component-dark rounded-2xl p-6 pt-7">
            <h2 className="font-bold text-sm text-secondary-l dark:text-secondary-d mb-2">SETTINGS</h2>

            <div className="flex flex-col lg:flex-row w-full p-2 gap-2">
                <h3 className="font-semibold text-sm text-secondary-l dark:text-secondary-d">Temperature</h3>

                    <div className="flex flex-row bg-bg-l">
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l rounded-l-lg">Farenheit</button>
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l border-x-0 ">Celcius</button>
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l rounded-r-lg">Kelvin</button>
                    </div>

                <h3 className="font-semibold text-sm text-secondary-l dark:text-secondary-d">Theme</h3>

                <div className="flex flex-row bg-bg-l">
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l border-r-0 rounded-l-lg">Dark</button>
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l rounded-r-lg">Light</button>
                    </div>

                <h3 className="font-semibold text-sm text-secondary-l dark:text-secondary-d">Language</h3>

                <div className="flex flex-row bg-bg-l">
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l border-r-0 rounded-l-lg">EN</button>
                        <button className="px-4 py-2 w-32 border-2 border-secondary-l rounded-r-lg">DE</button>
                    </div>
            </div>


        </div>
    );
}
export default Settings

export const RadioComponent = (): JSX.Element => {

    return (<></>);
}

interface RadioButtonProps {
    name: string,
    selected: boolean,
}
export const RadioButton: React.FC<RadioButtonProps> = (): JSX.Element => {

    return (
        <></>
    );
}