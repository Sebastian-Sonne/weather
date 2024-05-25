import MapComponent from "./Map";
import MapHeader from "./MapHeader";

const MapContainer = (): JSX.Element => {
   
    return (
        <div className="absolute flex flex-col p-6 w-[calc(100%-32px)] md:w-[700px] top-20 md:right-4 h-[400px] lg:h-[700px] bg-component-light dark:bg-component-dark shadow-lg rounded-lg">
            <MapHeader />
            <div className="h-full">
                <MapComponent />
            </div>
        </div>
    );
}
export default MapContainer