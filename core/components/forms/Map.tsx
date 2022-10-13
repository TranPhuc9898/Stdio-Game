import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react';

import { SITE_NAME } from '@stdio/configs/config';

import styles from './Map.module.scss';

interface IMarkerProps {
    color: any;
    name: any;
    id: any;
    lat?: number;
    lng?: number;
}

const Marker: FC<IMarkerProps> = ({ color, name }) => {
    return (
        <div
            className={styles.marker}
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
        />
    );
};

interface IProps {}

const Map: FC<IProps> = () => {
    const config = {
        key: 'AIzaSyBMF4kicOv-fC4-QyGstRy9eZ4PlQbgYwQ',
        center: {
            lat: 10.774464,
            lng: 106.635006,
        },
    };

    return (
        <div className={styles.map}>
            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: config.key }}
                defaultCenter={config.center}
                defaultZoom={17}
            >
                <Marker
                    name={SITE_NAME}
                    color="#00bbaa"
                    lat={config.center.lat}
                    lng={config.center.lng}
                    id={config.key}
                />
            </GoogleMapReact> */}
        </div>
    );
};

export default Map;
