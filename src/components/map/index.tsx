import { useDispatch } from "react-redux";
import MapComponent from "./Map";
import MapHeader from "./MapHeader";
import { setMapIsVisible } from "../../state/slices/mapSlice";
import { useCallback, useEffect, useRef } from "react";

const MapContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const mapRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
            dispatch(setMapIsVisible(false));
        }
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleInsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <div ref={mapRef}
            onMouseDown={handleInsideClick}
            className="absolute flex flex-col p-6 w-[calc(100%-32px)] md:w-1/2 md:min-w-[700px] top-20 md:right-4 h-[calc(100vh-32px)] bg-component-light dark:bg-component-dark shadow-lg rounded-lg">
           
            <MapHeader />

            <div className="h-full">
                <MapComponent />
            </div>
        </div>
    );
}
export default MapContainer