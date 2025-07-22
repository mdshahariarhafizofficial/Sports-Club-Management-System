import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import yellowIcon from '../../assets/marker-icon-yellow.png';
import shadowIcon from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
  iconUrl: yellowIcon,
  shadowUrl: shadowIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MyMap = () => {
  const position = [23.7805733, 90.2792399]; // Gulshan 1, Dhaka

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <span className='text-gray-400 text-lg'>Our Location</span>  <br /> Gulshan 1, Dhaka
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
