import Header from "./header/Header";
import { WeatherContent } from "./weather/Weather";

const MainContent = (): JSX.Element => {
    return (
        <div className="flex flex-col w-full gap-6 max-w-[2000px]">
            <Header />
            <WeatherContent />
        </div>
    );
}
export default MainContent